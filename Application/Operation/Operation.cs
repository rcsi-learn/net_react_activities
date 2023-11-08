using Persistence;
namespace Application.Operation;
public class Operation : IOperation
{
    private readonly DataContext _context;
    public Operation(DataContext context) => _context = context;

    private Get? _get;
    public IGet Get
    {
        get { return this._get ??= new Get(this._context); }
    }
    private Create? _create;
    public ICreate Create
    {
        get { return this._create ??= new Create(this._context); }
    }
    private Update? _update;
    public IUpdate Update
    {
        get { return this._update ??= new Update(this._context); }
    }
    private Delete? _delete;
    public IDelete Delete
    {
        get { return this._delete ??= new Delete(this._context); }
    }

}