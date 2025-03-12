using AutoMapper;
using JempaTV.Califications;
using JempaTV.Logs;
using JempaTV.Notifications;
using JempaTV.Series;
using JempaTV.Users;
using Volo.Abp.AuditLogging;
using Volo.Abp.Users;


namespace JempaTV;

public class JempaTVApplicationAutoMapperProfile : Profile
{
    public JempaTVApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateMap<CalificationDto, Calification>();
        CreateMap<Calification, CalificationDto>();
        CreateMap<Serie, SerieDto>();
        CreateMap<SerieDto, Serie>();
        CreateMap<Notification, NotificationDto>();
        CreateMap<NotificationDto, Notification>();
        CreateMap<AuditLog, LogDto>();
        CreateMap<LogDto, AuditLog>();
        CreateMap<Calification, CalificationDto>();
        CreateMap<CalificationDto, Calification>();
    }
}
