using Microsoft.Extensions.Localization;
using JempaTV.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace JempaTV;

[Dependency(ReplaceServices = true)]
public class JempaTVBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<JempaTVResource> _localizer;

    public JempaTVBrandingProvider(IStringLocalizer<JempaTVResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
