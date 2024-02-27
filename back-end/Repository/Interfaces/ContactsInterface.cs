using back_end.Models;

namespace back_end.Repository.Interfaces
{
    public interface ContactsInterface
    {
        Task<ContactsModel> Get(Guid id);
        Task<List<ContactsModel>> GetAll();
        Task<ContactsModel> Post(ContactsModel contact);
        Task<ContactsModel> Put(ContactsModel contact, Guid id);
        Task<bool> Delete(Guid id);
    }
}
