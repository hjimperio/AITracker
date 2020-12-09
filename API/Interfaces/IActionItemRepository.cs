using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IActionItemRepository
    {
        Task<IEnumerable<ActionItemDto>> GetActionItems();
        Task<ActionItemDto> GetActionItem(int actionItemId);
        Task<ActionItem> GetActionItemById(int actionItemId);
        void Add(ActionItem actionItem);
        void Update(ActionItem actionItem);
        void Delete(ActionItem actionItem);
        Task<bool> SaveAllAsync();
    }
}