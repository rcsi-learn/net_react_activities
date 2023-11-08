using Domain;
namespace Application.Operation;
public interface IDelete{
    public Task<Activity?> ByIdAsync(Guid id);
}