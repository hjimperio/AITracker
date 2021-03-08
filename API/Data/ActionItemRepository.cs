using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ActionItemRepository : IActionItemRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ActionItemRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ActionItemDto> GetActionItem(int id)
        {
            return await _context.ActionItems
                .Where(x => x.Id == id)
                .ProjectTo<ActionItemDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<ActionItemDto>> GetActionItems(ActionItemParams actionItemParams)
        {
            var query = _context.ActionItems.AsQueryable();
            
            //query = query.Where(u => u.UserName != userParams.CurrentUsername);

            if (actionItemParams.WorkOrderTypeRequest != null)
                query = query.Where(a => a.WorkOrderTypeRequest == actionItemParams.WorkOrderTypeRequest);

            if (actionItemParams.MapStatus != "all")
                query = query.Where(a => a.MapStatus == actionItemParams.MapStatus);

            if (actionItemParams.ActionItemNumber != null)
                query = query.Where(a => a.ActionItemNumber == actionItemParams.ActionItemNumber);

            if (actionItemParams.AICreatedBy > 0)
                query = query.Where(a => a.AiCreatedBy == actionItemParams.AICreatedBy);

            if (actionItemParams.InternalEmailSubject != null)
                query = query.Where(a => a.InternalEmailSubject.Contains(actionItemParams.InternalEmailSubject));

            if (actionItemParams.ExternalEmailSubject != null)
                query = query.Where(a => a.ExternalEmailSubject.Contains(actionItemParams.ExternalEmailSubject));

            if (actionItemParams.MetSLO != null)
                query = (actionItemParams.MetSLO.ToLower() == "yes") 
                ? query.Where(a => a.MetSLO)
                : query.Where(a => !a.MetSLO);

            if (actionItemParams.MetElapsedTarget != null)
                query = (actionItemParams.MetElapsedTarget.ToLower() == "yes") 
                ? query.Where(a => a.MetElapsedTarget)
                : query.Where(a => !a.MetElapsedTarget);

            if(actionItemParams.DateStartedFrom != null && actionItemParams.DateStartedTo != null) {
                var dateStartedFrom = Convert.ToDateTime(actionItemParams.DateStartedFrom, CultureInfo.InvariantCulture).ToLocalTime();
                var dateStartedTo = Convert.ToDateTime(actionItemParams.DateStartedTo, CultureInfo.InvariantCulture).ToLocalTime();

                query = query.Where( u => u.DateStarted >= dateStartedFrom && u.DateStarted <= dateStartedTo);
            }
            
            if(actionItemParams.DateResolvedFrom != null && actionItemParams.DateResolvedTo != null) {
                var dateResolvedFrom = DateTime.Parse(actionItemParams.DateResolvedFrom).ToLocalTime();
                var dateResolvedTo = DateTime.Parse(actionItemParams.DateResolvedTo).ToLocalTime();

                query = query.Where( u => u.DateResolved >= dateResolvedFrom && u.DateStarted <= dateResolvedTo);
            }

            query = actionItemParams.OrderBy switch
            {
                "created" => query.OrderByDescending(a => a.DateCreated),
                _=> query.OrderByDescending(a => a.Id)
            };

            return await PagedList<ActionItemDto>.CreateAsync(query.ProjectTo<ActionItemDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), 
                    actionItemParams.PageNumber, actionItemParams.PageSize);
        }

        public async Task<ActionItem> GetActionItemById(int actionItemId)
        {
            return await _context.ActionItems.SingleOrDefaultAsync(x => x.Id == actionItemId);
        }

        public async Task<ActionItem> GetExistingActionItem(string actionItemNumber)
        {
            if (actionItemNumber == "")
                return null;

            return await _context.ActionItems
                .FirstOrDefaultAsync(x => x.ActionItemNumber == actionItemNumber);
        }

        public async Task<IEnumerable<ActionItemDto>> GetActionItemsList(string dateToday)
        {
            var query = _context.ActionItems.AsQueryable();

            if (dateToday != null) {
                var date = Convert.ToDateTime(dateToday, CultureInfo.InvariantCulture).ToLocalTime();
                query = query.Where(x => x.DateStarted.Date.Month == date.Date.Month);
                query = query.Where(x => x.DateStarted.Date.Year == date.Date.Year);
            }

            return await query.ProjectTo<ActionItemDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Add(ActionItem actionItem)
        {
            _context.ActionItems.Add(actionItem);
        }

        public void Delete(ActionItem actionItem)
        {
            _context.Entry(actionItem).State = EntityState.Deleted;
        }

        public void Update(ActionItem actionItem)
        {
            _context.Entry(actionItem).State = EntityState.Modified;
        }
    }
}