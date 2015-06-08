<section role="layout">
    <% include HeroImage %>

    <div class="container">
        <article class="fixed-w typography">
            <div class="content">

                $Content
                $Form

                <% if $SortedContentModules %>
                    <% loop $SortedContentModules %>
                        $Me
                    <% end_loop %>
                <% end_if %>

            </div>
        </article>
    </div>
</section>