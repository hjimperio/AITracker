using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using ClosedXML.Excel;
using ClosedXML.Report;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ActionItemsController : BaseApiController
    {
        private readonly IActionItemRepository _actionItemRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public ActionItemsController(IActionItemRepository actionItemRepository, IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _actionItemRepository = actionItemRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActionItemDto>>> GetActionItems([FromQuery] ActionItemParams actionItemParams)
        {
            var actionItem = await _actionItemRepository.GetActionItems(actionItemParams);
            var users = await _userRepository.GetUsers();

            actionItem.ForEach(x => {
                if(x.AiCreatedBy != 0) {
                    var user = users.SingleOrDefault(u => u.Id == x.AiCreatedBy);
                    x.AICreatedByName = $"{user.FirstName} {user.LastName}";
                }
            });

            Response.AddPaginationHeader(actionItem.CurrentPage, actionItem.PageSize,
                actionItem.TotalCount, actionItem.TotalPages);

            return Ok(actionItem);
        }

        [HttpGet("{actionItemId}", Name = "GetActionItem")]
        public async Task<ActionResult<ActionItemDto>> GetActionItem(int actionItemId)
        {
            var actionItem = await _actionItemRepository.GetActionItem(actionItemId);
            var users = await _userRepository.GetUsers();

            if (actionItem.AiCreatedBy != 0) {
                var user = users.SingleOrDefault(u => u.Id == actionItem.AiCreatedBy);
                if (user != null) {
                    actionItem.AICreatedByName = $"{user.FirstName} {user.LastName}";
                }  else {
                    actionItem.AICreatedByName = "Nothing assigned";
                }
            }
            return actionItem;
        }

        [HttpPost]
        public async Task<ActionResult> AddActionItem(ActionItemAddDto actionItemAddDto)
        {
            var actionItemChecker = await _actionItemRepository
                .GetExistingActionItem(actionItemAddDto.ActionItemNumber);

            if (actionItemChecker != null)
                return BadRequest("Existing AI already entered");

            var elapsedWorkOrders = new List<string>() {
                "Change Request", "Clone", "Base"
            };

            var actionItem = _mapper.Map(actionItemAddDto, new ActionItem { });
            actionItem.AppUserId = User.GetUserId();
            actionItem.DateStarted = actionItem.DateStarted.ToLocalTime();
            actionItem.DateResolved = actionItem.DateResolved.ToLocalTime();
            actionItem.DueDate = actionItem.DateStarted.CalculateDueDate(actionItem.WorkOrderTypeRequest, "SLO");
            actionItem.SLODays = GetDays(actionItem.WorkOrderTypeRequest, "SLO");
            actionItem.ElapsedDueDate = actionItem.DateStarted.CalculateDueDate(actionItem.WorkOrderTypeRequest, "Elapsed");
            actionItem.TargetElapsedDays =
                (elapsedWorkOrders.Contains(actionItem.WorkOrderTypeRequest)) ? GetDays(actionItem.WorkOrderTypeRequest, "Elapsed") : 0;

            if (actionItem.DateResolved > actionItem.DateStarted)
            {
                var date = actionItem.DateStarted.CalculateElapsedDays(actionItem.DateResolved);
                actionItem.MetSLO = (date.TotalDays < actionItem.SLODays) ? true : false;
                actionItem.MetElapsedTarget = (date.TotalDays < actionItem.TargetElapsedDays) ? true : false;
                actionItem.DaysAndHoursSpent =
                    $"{Decimal.Truncate((decimal)date.TotalDays)} days, {Math.Round(date.TotalHours, 3)} hours, {Math.Round(date.TotalMinutes, 3)} minutes";
                actionItem.ElapsedDays = date.TotalDays;
            }

            _actionItemRepository.Add(actionItem);

            if (await _actionItemRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to add action item");
        }

        [HttpPut("{actionItemId}")]
        public async Task<ActionResult> UpdateActionItem(int actionItemId, ActionItemUpdateDto actionItemUpdateDto)
        {
            var actionItem = await _actionItemRepository.GetActionItemById(actionItemId);

            if (actionItem == null)
                return NotFound("Action Item not found");

            if (actionItem.ActionItemNumber != actionItemUpdateDto.ActionItemNumber)
            {
                var actionItemChecker = await _actionItemRepository
                    .GetExistingActionItem(actionItemUpdateDto.ActionItemNumber);

                if (actionItemChecker != null)
                    return BadRequest("Existing AI already entered");
            }

            var elapsedWorkOrders = new List<string>() {
                "Change Request", "Clone", "Base"
            };
            
            _mapper.Map(actionItemUpdateDto, actionItem);
            actionItem.DateStarted = actionItem.DateStarted.ToLocalTime();
            actionItem.DateResolved = actionItem.DateResolved.ToLocalTime();
            actionItem.DueDate = actionItem.DateStarted.CalculateDueDate(actionItem.WorkOrderTypeRequest, "SLO");
            actionItem.SLODays = GetDays(actionItem.WorkOrderTypeRequest, "SLO");
            actionItem.ElapsedDueDate = actionItem.DateStarted.CalculateDueDate(actionItem.WorkOrderTypeRequest, "Elapsed");
            actionItem.TargetElapsedDays =
                (elapsedWorkOrders.Contains(actionItem.WorkOrderTypeRequest)) ? GetDays(actionItem.WorkOrderTypeRequest, "Elapsed") : 0;

            if (actionItem.DateResolved > actionItem.DateStarted)
            {
                var date = actionItem.DateStarted.CalculateElapsedDays(actionItem.DateResolved);
                actionItem.MetSLO = (date.TotalDays < actionItem.SLODays) ? true : false;
                actionItem.MetElapsedTarget = (date.TotalDays < actionItem.TargetElapsedDays) ? true : false;
                actionItem.DaysAndHoursSpent =
                    $"{Decimal.Truncate((decimal)date.TotalDays)} days, {Math.Round(date.TotalHours, 3)} hours, {Math.Round(date.TotalMinutes, 3)} minutes";
                actionItem.ElapsedDays = date.TotalDays;
            }
            _actionItemRepository.Update(actionItem);

            if (await _actionItemRepository.SaveAllAsync()) return Ok();

            return BadRequest("Nothing is updated");
        }

        [HttpDelete("{actionItemId}")]
        public async Task<ActionResult> DeleteActionItem(int actionItemId)
        {
            var actionItem = await _actionItemRepository.GetActionItemById(actionItemId);

            if (actionItem == null)
                return NotFound("Action Item not found");

            _actionItemRepository.Delete(actionItem);

            if (await _actionItemRepository.SaveAllAsync()) return Ok();

            return BadRequest("Nothing is deleted");
        }

        [HttpGet("sample/{actionItemId}")]
        public async Task<ActionResult> SampleCode(int actionItemId)
        {
            var actionItem = await _actionItemRepository.GetActionItem(actionItemId);
            var dateSample = actionItem.DateStarted.CalculateDueDate(actionItem.WorkOrderTypeRequest, "SLO");
            var dateSampleElapsed = actionItem.DateStarted.CalculateDueDate(actionItem.WorkOrderTypeRequest, "Elapsed");
            var elapsedDays = actionItem.DateStarted.CalculateElapsedDays(actionItem.DateResolved);

            return Ok(elapsedDays);
        }

        [HttpGet("list")]
        public async Task<ActionResult> GetActionItemsList([FromQuery] string dateToday)
        {
            var actionItems = await _actionItemRepository.GetActionItemsList(dateToday);

            return Ok(actionItems);
        }

        [HttpGet("reports")]
        public async Task<ActionResult> GenerateReport([FromQuery] ActionItemReportParams actionItemReportParams)
        {
            var actionItems = await _actionItemRepository.GetActionItemsReport(actionItemReportParams);

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Action Items");
                var currentRow = 1;

                #region Header
                worksheet.Cell(currentRow, 1).Value = "Region";
                worksheet.Cell(currentRow, 2).Value = "Division";
                worksheet.Cell(currentRow, 3).Value = "Internal Email Subject";
                worksheet.Cell(currentRow, 4).Value = "External Email Subject";
                worksheet.Cell(currentRow, 5).Value = "WOTR";
                worksheet.Cell(currentRow, 6).Value = "Task Number";
                worksheet.Cell(currentRow, 7).Value = "Action Item";
                worksheet.Cell(currentRow, 8).Value = "Date Started";
                worksheet.Cell(currentRow, 9).Value = "Date Resolved";
                worksheet.Cell(currentRow, 10).Value = "Map Status";
                worksheet.Cell(currentRow, 11).Value = "SCJON Due Date";
                worksheet.Cell(currentRow, 12).Value = "SLO Days";
                worksheet.Cell(currentRow, 13).Value = "Met SLO?";
                worksheet.Cell(currentRow, 14).Value = "Target Elapsed Date";
                worksheet.Cell(currentRow, 15).Value = "Target Elapsed Days";
                worksheet.Cell(currentRow, 16).Value = "Met Elapsed Target?";
                worksheet.Cell(currentRow, 17).Value = "Elapsed Days";
                worksheet.Cell(currentRow, 18).Value = "Created By";
                #endregion

                #region Body
                foreach (var actionItem in actionItems)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = actionItem.Region;
                    worksheet.Cell(currentRow, 2).Value = actionItem.Division;
                    worksheet.Cell(currentRow, 3).Value = actionItem.InternalEmailSubject;
                    worksheet.Cell(currentRow, 4).Value = actionItem.ExternalEmailSubject;
                    worksheet.Cell(currentRow, 5).Value = actionItem.WorkOrderTypeRequest;
                    worksheet.Cell(currentRow, 6).Value = actionItem.TaskNumber;
                    worksheet.Cell(currentRow, 7).Value = actionItem.ActionItemNumber;
                    worksheet.Cell(currentRow, 8).Value = actionItem.DateStarted.ToLocalTime();
                    worksheet.Cell(currentRow, 9).Value = actionItem.DateResolved.ToLocalTime();
                    worksheet.Cell(currentRow, 10).Value = actionItem.MapStatus;
                    worksheet.Cell(currentRow, 11).Value = actionItem.DueDate.ToLocalTime();
                    worksheet.Cell(currentRow, 12).Value = actionItem.SLODays;
                    worksheet.Cell(currentRow, 13).Value = actionItem.MetSLO ? "Y" : "N";
                    worksheet.Cell(currentRow, 14).Value = actionItem.ElapsedDueDate.ToLocalTime();
                    worksheet.Cell(currentRow, 15).Value = actionItem.TargetElapsedDays;
                    worksheet.Cell(currentRow, 16).Value = actionItem.MetElapsedTarget ? "Y" : "N";
                    worksheet.Cell(currentRow, 17).Value = actionItem.ElapsedDays;
                    worksheet.Cell(currentRow, 18).Value = actionItem.CreatedBy;
                }
                #endregion

                //////////////////////////////////////////////////////////////////
                // Do some formatting
                worksheet.Columns("A:R").Width = 20;
                var rngTitle = worksheet.Range("A1:R1");
                rngTitle.Style.Font.Bold = true;
                rngTitle.Style.Fill.BackgroundColor = XLColor.Cyan;

                worksheet.Columns().AdjustToContents();

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "ActionItems.xlsx"
                        );
                }
            }
        }

        private int GetDays(string workOrder, string predicate)
        {
            var days = 0;

            switch (workOrder)
            {
                case "Change Request":
                    days = (predicate == "SLO") ? 2 : 1;
                    break;
                case "Clone":
                    days = (predicate == "SLO") ? 7 : 2;
                    break;
                case "Base":
                    days = (predicate == "SLO") ? 10 : 3;
                    break;
                case "Complex":
                    days = 13;
                    break;
                case "FS Complex":
                    days = 15;
                    break;
            }

            return days;
        }
    }
}