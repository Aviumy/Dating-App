namespace API.Interfaces
{
    public interface IRepository<T>
    {
        Task<T> GetAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        void Update(T item);
        Task<bool> SaveAllAsync();
    }
}
