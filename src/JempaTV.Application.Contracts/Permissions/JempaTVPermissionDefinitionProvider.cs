using JempaTV.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace JempaTV.Permissions;

public class JempaTVPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(JempaTVPermissions.GroupName);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(JempaTVPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<JempaTVResource>(name);
    }
}
