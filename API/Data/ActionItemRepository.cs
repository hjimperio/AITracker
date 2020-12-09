using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
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

        public async Task<IEnumerable<ActionItemDto>> GetActionItems()
        {
            return await _context.ActionItems
                .ProjectTo<ActionItemDto>(_mapper.ConfigurationProvider)
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

        public async Task<ActionItem> GetActionItemById(int actionItemId)
        {
            return await _context.ActionItems.SingleOrDefaultAsync(x => x.Id == actionItemId);
        }
    }
}