namespace BedAndBroadband.Startup
{
    using Simple.Web;

    public class Mappings : IStartupTask
    {
        public void Run(IConfiguration configuration, IWebEnvironment environment)
        {
            // Files
            configuration.PublicFileMappings.Add("/", "/index.html");

            // Folders
            configuration.PublicFolders.Add("/Content");
            configuration.PublicFolders.Add("/html");
            configuration.PublicFolders.Add("/Scripts");
        }
    }
}