using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Operation;
public interface IGet
{
    public Task<Activity[]?> AllAsync();
    public Task<Activity?> ByIdAsync(Guid id);
}