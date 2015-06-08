<header class="block-header">
	<div class="fixed-w">
        <% include MobileNavigation %>

		<div class="logo"><h1><a href="/">My Site</a></h1></div>
		<% include Navigation %>

        <% if $SearchForm %>
            <div class="search-field">
                $SearchForm
            </div>
        <% end_if %>
	</div>

    <div class="dropdown-container">
        <span class="page-scroll-button">
            <a>a</a>
        </span>
    </div>
</header>