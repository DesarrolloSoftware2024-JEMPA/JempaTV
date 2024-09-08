using JempaTV.Localization;
using Volo.Abp.Application.Services;

namespace JempaTV;

/* Inherit your application services from this class.
 */
public abstract class JempaTVAppService : ApplicationService
{
    protected JempaTVAppService()
    {
        LocalizationResource = typeof(JempaTVResource);
    }
}
