<% if $Pages %>
<ul class="breadcrumbs fixed-w <% if not $BlockBreadcrumbs %>overlayed<% end_if %>">
    <% loop $Pages %>
    <li><a href="$Link" <% if $Last %>class="current"<% end_if %>>$Title</a></li>
    <% end_loop %>
</ul>
<% end_if %>