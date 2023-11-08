using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Operation;
public class Update : IUpdate
{
    private readonly DataContext _context;
    public Update(DataContext context) => _context = context;

    public async Task<Activity?> ByIdAsync(Activity UpdatedActivity)
    {
        if (_context == null || _context.Activities == null || UpdatedActivity == null) return null;
        Activity? activity = await _context.Activities.FindAsync(UpdatedActivity.Id);
        if (activity != null)
        {
            _context.Entry<Activity>(activity).CurrentValues.SetValues(UpdatedActivity);
            await _context.SaveChangesAsync();
        }
        return activity;
    }
}
