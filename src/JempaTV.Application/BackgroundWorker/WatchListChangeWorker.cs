using JempaTV.Notifications;
using JempaTV.WatchLists;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.BackgroundWorkers;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Threading;
using Volo.Abp.Users;

namespace JempaTV.BackgroundWorker
{
    public class WatchListChangeWorker : AsyncPeriodicBackgroundWorkerBase
    {

        private readonly IWatchListAppService? _watchListAppService; // Es nullable 
        private readonly INotificationAppService? _notificationAppService; // Es nullable 
        private readonly ILogger<WatchListChangeWorker> _logger;

        public WatchListChangeWorker(ILogger<WatchListChangeWorker> logger,
                AbpAsyncTimer timer,
                IWatchListAppService watchListAppService,
                INotificationAppService notificationAppService,
                IServiceScopeFactory serviceScopeFactory
            ) : base(
                timer,
                serviceScopeFactory)
        {
            Timer.Period = 86400000; // 1 day
            _watchListAppService = watchListAppService;
            _notificationAppService = notificationAppService;
            _logger = logger;

        }

        protected async override Task DoWorkAsync(
            PeriodicBackgroundWorkerContext workerContext)
        {

            //Resolve dependencies
            var serieRepository = workerContext
                .ServiceProvider
                .GetRequiredService<IRepository>();

            //Do the work

            if (_watchListAppService == null)
            {
                _logger.LogInformation("WatchListAppService no está inicializado.");
                return;
            }
            if (_notificationAppService == null)
            {
                _logger.LogInformation("NotificationAppService no está inicializado.");
                return;
            }


            var watchListChanges = await _watchListAppService.GetRecentChangesAsync();

            foreach (var watchlist in watchListChanges)
            {
                // Generar notificacion y enviarla al cliente con el ID User

                // Podria el usuario tener configurado el tipo de notificacion que quiere recibir y de ahi obtener el Notification.type
                // Notification.content por ahora sera general, notificará que hubo novedades en la series pertenecientes a su watchlist.

                //var notif = new NotificationDto(Fecha = DateTime.Now,, )
                //{
                //    Id = watchlist.Id,
                //    Title = "Hay novedades para ti!",
                //    Content = "Nuevos episodios o temporadas para las Series que quieres ver, ve a tu WatchList!",
                //    Type = "Email",
                //    Read = false,
                    
                //};

                 //await _notificationAppService.SendNotification(notif);

            }

        }
    }
}
