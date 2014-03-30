<header>
	<div class="content">
		<div class="logo"><h1><a href="/">My Site</a></h1></div>
        <% if $SearchForm %>
            <div class="search-bar">
                $SearchForm
            </div>
        <% end_if %>
		<% include Navigation %>
	</div>
</header>