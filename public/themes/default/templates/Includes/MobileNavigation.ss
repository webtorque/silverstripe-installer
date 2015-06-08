<div id="mobileMenuButton"><a href="" alt="HIDE MENU">Full Menu</a></div>
<nav class="mobile-nav">
    <ul class="menu">
        <% loop $Menu(1) %>
            <li class="$FirstLast" <% if $Children %>class="has-dropdown not-click"<% end_if %>>
                <a href="$Link" class="$LinkingMode">$MenuTitle.XML</a>
                <% if $Children %>
                    <ul class="nav-dropdown">
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
