namespace Application.Operation;
public interface IOperation{
    IGet Get {get;}
    ICreate Create {get;}
    IUpdate Update {get;}
    IDelete Delete {get;}
}