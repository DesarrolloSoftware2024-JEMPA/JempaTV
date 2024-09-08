using Volo.Abp.Settings;

namespace JempaTV.Settings;

public class JempaTVSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(JempaTVSettings.MySetting1));
    }
}
