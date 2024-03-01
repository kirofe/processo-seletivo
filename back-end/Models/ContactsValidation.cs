using FluentValidation;

namespace back_end.Models
{
    public class ContactsValidation : AbstractValidator<ContactsModel>
    {
        public ContactsValidation() 
        {
            RuleFor(c => c.FirstName).NotEmpty().WithMessage("Nome é obrigatorio");
            RuleFor(c => c.LastName).NotEmpty().WithMessage("Sobrenome é obrigatorio");
            RuleFor(c => c.Email).EmailAddress().NotEmpty().WithMessage("Email é obrigatorio");
            RuleFor(c => c.CPF).IsValidCPF().WithMessage("CPF Invalido").NotEmpty().WithMessage("CPF é obrigatorio");
            RuleFor(c => c.CEP).Matches(@"^\d{5}-\d{3}$|^\d{8}$").WithMessage("CEP Invalido").NotEmpty().WithMessage("CEP é obrigatorio");
        }
    }
}
