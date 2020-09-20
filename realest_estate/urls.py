from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from django.conf.urls import include, url
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    #path('api-auth/', include('rest_framework.urls')),
    #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/accounts/', include('accounts.urls')),
    path('api/realtors/', include('realtors.urls')),
    path('api/listings/', include('listings.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('admin/', admin.site.urls),
    path('api/token-auth/', obtain_jwt_token,),
    url(r'^media/(?P<path>.*)$', serve,
        {'document_root': settings.MEDIA_ROOT, }),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
