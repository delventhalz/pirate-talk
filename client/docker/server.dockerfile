# Copyright 2017 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -----------------------------------------------------------------------------

# NOTE: Use `volumes` to make: client/public/
# available at: /usr/local/apache2/htdocs/

FROM httpd:2.4

RUN echo "\
\n\
ServerName pirate_talk_client\n\
AddDefaultCharset utf-8\n\
LoadModule proxy_module modules/mod_proxy.so\n\
LoadModule proxy_http_module modules/mod_proxy_http.so\n\
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so\n\
ProxyPass /api/subscriptions ws://rest-api:8008/subscriptions\n\
ProxyPass /api http://rest-api:8008\n\
ProxyPassReverse /api http://rest-api:8008\n\
RequestHeader set X-Forwarded-Path /api\n\
\n\
" >>/usr/local/apache2/conf/httpd.conf

EXPOSE 80/tcp
