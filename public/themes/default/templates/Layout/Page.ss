<% if $ShowBreadcrumbs %>
    $Breadcrumbs
<% end_if %>

<% if $Content %>
    <section id="$ModuleID" class="genericContentModule typography content-module text-only">
        <div class="fixed-w">
            <h1>$Title</h1>

            $Content
        </div>
    </section>
<% end_if %>

$Form
$CommentsForm
<% include ContentModules %>
