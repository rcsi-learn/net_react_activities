using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Application.Operation;
public class Create : ICreate
{
    private readonly DataContext _context;
    public Create(DataContext context) => _context = context;

    public async Task<Activity?> Add(Activity activity)
    {
        try
        {
            //var options = new JsonSerializerOptions();
            // options.PropertyNameCaseInsensitive = true;
            //var objmsg = "{\"id\":\"00000000-0000-0000-0000-000000000000\",\"title\":\"t1\",\"date\":\"2023-08-05\",\"description\":\"d1\",\"category\":\"c1\",\"city\":\"c1\",\"venue\":\"v1\",\"completed\":false}";
            //Activity? activity = JsonSerializer.Deserialize<Activity>(objmsg?.ToString() ?? "", options);
            //Activity? activity = JsonSerializer.Deserialize<Activity>(objActivity?.ToString() ?? "", options);
            if (_context == null || _context.Activities == null || activity == null) return null;
            activity.Id = new Guid();
            await _context.Activities.AddAsync(activity);
            await _context.SaveChangesAsync();
            return activity;
        }
        catch(Exception ex){
            var msg = ex.Message;
            return null;
        }
    }
}