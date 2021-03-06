using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IActionItemRepository
    {
        void Add(ActionItem actionItem);
        void Update(ActionItem actionItem);
        void Delete(ActionItem actionItem);
        Task<PagedList<ActionItemDto>> GetActionItems(ActionItemParams actionItemParams);
        Task<IEnumerable<ActionItemDto>> GetActionItemsList(string dateToday);
        Task<IEnumerable<ActionItemDto>> GetActionItemsReport(ActionItemReportParams actionItemReportParams);
        Task<ActionItemDto> GetActionItem(int actionItemId);
        Task<ActionItem> GetActionItemById(int actionItemId);
        Task<ActionItem> GetExistingActionItem(string actionItem);
        Task<bool> SaveAllAsync();
    }
}