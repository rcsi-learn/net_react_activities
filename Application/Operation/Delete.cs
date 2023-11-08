using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Operation;
public class Delete : IDelete
{
    private readonly DataContext _context;
    public Delete(DataContext context) => _context = context;

    public async Task<Activity?> ByIdAsync(Guid id)
    {
        if (_context == null || _context.Activities == null || id == null) return null;
        Activity? activity = await _context.Activities.FindAsync(id);
        if(activity == null) return null;
        _context.Set<Activity>().Remove(activity);
        await _context.SaveChangesAsync();
        return activity;
    }
}