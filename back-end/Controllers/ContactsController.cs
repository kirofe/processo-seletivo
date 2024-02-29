using back_end.Models;
using back_end.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : Controller
    {
        private ContactsInterface _contactsInterface;

        public ContactsController(ContactsInterface contactsInterface) 
        {
            _contactsInterface = contactsInterface;
        }

        [HttpGet]
        public async Task<ActionResult<List<ContactsModel>>> GetAll()
        {
            List<ContactsModel> contacts = await _contactsInterface.GetAll();

            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactsModel>> Get(Guid id)
        {
            ContactsModel contact = await _contactsInterface.Get(id);

            return Ok(contact);
        }

        [HttpPost]
        public async Task<ActionResult<ContactsModel>> Post([FromBody] ContactsModel contact)
        {
            ContactsModel addContact = await _contactsInterface.Post(contact);

            return Ok(addContact);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ContactsModel>> Put([FromBody] ContactsModel contact, Guid id)
        {
            ContactsModel updateContact = await _contactsInterface.Put(contact, id);

            return Ok(updateContact);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            bool response = await _contactsInterface.Delete(id);

            return Ok(response);
        }
    }
}
