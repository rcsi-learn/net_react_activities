using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using Application.Operation;

namespace API.Controllers;
public class ActivitiesController : BaseApiController
{
    // private readonly DataContext _context;
    // public ActivitiesController(DataContext context) => _context = context;

    // private readonly Operation _operacion;
    // public ActivitiesController(DataContext context) => _operacion = new Operation(context);

    private readonly IOperation _operation;
    public ActivitiesController(DataContext context) => _operation = new Operation(context);

    [HttpGet]
    public async Task<ActionResult<Activity[]>> GetActivities()
    {
        Activity[]? Activities = await _operation.Get.AllAsync(); //_operacion.Get.AllAsync();
        return Activities?.Length == 0 ? NotFound() : Ok(Activities);
    }

    [HttpGet("{id:Guid}")]
    public async Task<ActionResult<Activity>> GetActivitiesById(Guid id)
    {
        Activity? Activity = await _operation.Get.ByIdAsync(id);
        return Activity == null ? NotFound() : Ok(Activity);
    }

    [HttpPost]
    public async Task<ActionResult<Activity>> CreateActivity([FromBody] Activity activity)
    {
        return activity == null ? NotFound() : Ok(await _operation.Create.Add(activity));
    }

    [HttpPut]
    public async Task<ActionResult<Activity>> UpdateActivityById([FromBody] Activity UpdatedActivity)
    {
        Activity? Activity = await _operation.Update.ByIdAsync(UpdatedActivity);
        return Activity == null ? NotFound(UpdatedActivity) : Ok(Activity);
    }

    [HttpDelete("{id:Guid}")]
    public async Task<ActionResult<Activity>> DeleteActivityById(Guid id)
    {
        Activity? Activity = await _operation.Delete.ByIdAsync(id);
        return Activity == null ? NotFound(id) : Ok(Activity);
    }
}