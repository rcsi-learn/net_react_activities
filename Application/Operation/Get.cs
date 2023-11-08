using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Operation;
public class Get : IGet
{
    private readonly DataContext _context;
    public Get(DataContext context) => _context = context;

    public async Task<Activity[]?> AllAsync()
    {
        if (_context == null || _context.Activities == null) return null;
        return await _context.Activities.ToArrayAsync();
    }
    public async Task<Activity?> ByIdAsync(Guid id)
    {
        if (_context == null || _context.Activities == null || id == null) return null;
        return await _context.Activities.FirstOrDefaultAsync(x => x.Id == id) ?? new Activity();
    }
}