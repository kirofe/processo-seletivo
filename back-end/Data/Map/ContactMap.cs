using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace back_end.Data.Map
{
    public class ContactMap : IEntityTypeConfiguration<ContactsModel>
    {
        public void Configure(EntityTypeBuilder<ContactsModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(255);
            builder.Property(x => x.LastName).IsRequired().HasMaxLength(255);
            builder.Property(x => x.Email).IsRequired().HasMaxLength(255);
            builder.Property(x => x.Phone).IsRequired().HasMaxLength(255);
            builder.Property(x => x.CPF).IsRequired().HasMaxLength(255);
            builder.Property(x => x.CEP).IsRequired().HasMaxLength(255);
        }
    }
}
