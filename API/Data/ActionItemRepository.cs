using System;
using System.Collections.Generic;
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
            query = query.Where(a => a.MapStatus == actionItemParams.MapStatus);
            
            // var minDob = DateTime.Today.AddYears(-actionItemParams.MaxAge - 1);
            // var maxDob = DateTime.Today.AddYears(-actionItemParams.MinAge);

            // query = query.Where( u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = actionItemParams.OrderBy switch
            {
                "created" => query.OrderByDescending(a => a.DateCreated),
                _=> query.OrderByDescending(a => a.Id)
            };

            return await PagedList<ActionItemDto>.CreateAsync(query.ProjectTo<ActionItemDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), 
                    actionItemParams.PageNumber, actionItemParams.PageSize);
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

        public async Task<ActionItem> GetActionItemById(int actionItemId)
        {
            return await _context.ActionItems.SingleOrDefaultAsync(x => x.Id == actionItemId);
        }

        public async Task<ActionItem> GetExistingActionItem(string actionItemNumber)
        {
            return await _context.ActionItems
                .FirstOrDefaultAsync(x => x.ActionItemNumber == actionItemNumber);
        }
    }
}