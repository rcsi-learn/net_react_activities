using Domain;
namespace Application.Operation;
public interface IUpdate{
    public Task<Activity?> ByIdAsync(Activity NewActivity);
}