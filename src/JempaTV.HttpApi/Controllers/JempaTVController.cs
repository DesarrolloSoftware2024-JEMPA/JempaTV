using JempaTV.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace JempaTV.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class JempaTVController : AbpControllerBase
{
    protected JempaTVController()
    {
        LocalizationResource = typeof(JempaTVResource);
    }
}
