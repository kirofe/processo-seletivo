using back_end.Data;
using back_end.Models;
using back_end.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace back_end.Repository
{
    public class ContactsRepository : ContactsInterface
    {
        private ApiContext context;

        public ContactsRepository(ApiContext context) {
            this.context = context;
        }
        public async Task<ContactsModel> Get(Guid id)
        {
            try
            {
                return await context.Contacts.FirstOrDefaultAsync(x => x.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro durante a busca: " + ex.Message);
            }
        }

        public async Task<List<ContactsModel>> GetAll()
        {
            try
            {
                return await context.Contacts.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro durante a busca: " + ex.Message);
            }
        }

        public async Task<ContactsModel> Post(ContactsModel contact)
        {
            try
            {
                await context.Contacts.AddAsync(contact);
                await context.SaveChangesAsync();

                return contact;
            } 
            catch (Exception ex)
            {
                throw new Exception("Erro durante a adição: " + ex.Message);
            }
        }

        public async Task<ContactsModel> Put(ContactsModel contact, Guid id)
        {
            try
            {
                ContactsModel getContact = await Get(id);

                if (getContact.Id == Guid.Empty)
                {
                    throw new Exception("Contato não encontrado");
                }
                 
                getContact.FirstName = contact.FirstName;
                getContact.LastName = contact.LastName;
                getContact.Email = contact.Email;
                getContact.Phone = contact.Phone;
                getContact.CPF = contact.CPF;
                getContact.CEP = contact.CEP;

                context.Contacts.Update(getContact);
                await context.SaveChangesAsync();

                return getContact;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro durante a atualização: " + ex.Message);
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            try
            {
                ContactsModel getContact = await Get(id);

                if (getContact.Id == Guid.Empty)
                {
                    throw new Exception("Contato não encontrado");
                }
                
                context.Contacts.Remove(getContact);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao tentar remover");
            }
        }
    }
}
