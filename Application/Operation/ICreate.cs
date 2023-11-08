using Domain;
namespace Application.Operation;
public interface ICreate{
    public Task<Activity?>Add(Activity activity);
}