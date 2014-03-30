<nav>
	<ul class="nav">
		<% loop $Menu(1) %>
		<li class="$FirstLast" <% if $Children %>class="has-dropdown not-click"<% end_if %>>
			<a href="$Link" class="$LinkingMode">$MenuTitle.XML</a>
			<% if $Children %>
			<ul class="dropdown">
                <div class="arrow"></div>
				<% loop $Children %>
				<li><a href="$Link" class="$LinkingMode">$MenuTitle.XML</a></li>
				<% end_loop %>
			</ul>
			<% end_if %>
		</li>
		<% end_loop %>
	</ul>
</nav>