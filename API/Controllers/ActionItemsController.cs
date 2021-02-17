using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ActionItemsController : BaseApiController
    {
        private readonly IActionItemRepository _actionItemRepository;
        private readonly IMapper _mapper;
        public ActionItemsController(IActionItemRepository actionItemRepository, IMapper mapper)
        {
            _mapper = mapper;
            _actionItemRepository = actionItemRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActionItemDto>>> GetActionItems([FromQuery]ActionItemParams actionItemParams)
        {
            var actionItem = await _actionItemRepository.GetActionItems(actionItemParams);
            
            Response.AddPaginationHeader(actionItem.CurrentPage, actionItem.PageSize, 
                actionItem.TotalCount, actionItem.TotalPages);

            return Ok(actionItem);
        }

        [HttpGet("{actionItemId}", Name = "GetActionItem")]
        public async Task<ActionResult<ActionItemDto>> GetActionItem(int actionItemId)
        {
            var actionItem = await _actionItemRepository.GetActionItem(actionItemId);
                
            return actionItem;
        }

        [HttpPost]
        public async Task<ActionResult> AddActionItem(ActionItemAddDto actionItemAddDto)
        {
            var actionItemChecker = await _actionItemRepository
                .GetExistingActionItem(actionItemAddDto.ActionItemNumber);

            if (actionItemChecker != null)
                return BadRequest("Existing AI already entered");

            var actionItem = _mapper.Map(actionItemAddDto, new ActionItem {});
            actionItem.AppUserId = User.GetUserId();
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

            _mapper.Map(actionItemUpdateDto, actionItem);
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
    }
}