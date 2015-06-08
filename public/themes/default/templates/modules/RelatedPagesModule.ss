<div class="module">
    <div class="moduleWrap">
        <div class="pop">
            <% if $ContentTitle %><h2>$ContentTitle</h2><% end_if %>

            <% if $ShowSearch %>
            <div class="filter">

                <div class="filterSearch">
                    <form name="frmFilter" method="get" action="$FormURL">
                        <label for="filter_search_input">Keyword</label>
                        <div class="textInputWrap">
                            <input type="text" name="Keyword[$ID]" class="searchExpand" id="filter_search_input" maxlength="64" value="$KeywordFilter.XML">
                            <% if $CategoryFilter %>
                            <input type="hidden" name="Category[$ID]" value="$CategoryFilter">
                            <% end_if %>
                            <input type="hidden" name="Date[$ID]" class="dateField" value="$DateFilter">
                        </div>
                        <div class="submitInputWrap">
                            <input type="submit" id="filter_search_submit" value="">
                        </div>
                    </form>
                </div>

                <% if $ShowCategories %>
                <div class="filterBar">
                    <ul>
                        <% loop $Categories %>
                        <li><a href="$Link" class="$LinkingMode preventScrolling">$Title</a></li>
                        <% end_loop %>
                    </ul>
                </div>
                <% end_if %>

            </div>
            <% end_if %>

            <div class="tiles" data-rows="1">

                <% if ShowSearch %>
                <div class="tileFilter">
                    <p>Filter</p>
                    <div class="selectWrap">
                        <select class="dateFilter">
	                    <option value="">All</option>
                            <option value="7-days" <% if $DateFilter == '7-days' %>selected="selected"<% end_if %>>From the last week</option>
                            <option value="1-months" <% if $DateFilter == '1-months' %>selected="selected"<% end_if %>>From the last month</option>
                            <option value="3-months" <% if $DateFilter == '3-months' %>selected="selected"<% end_if %>>From the last 3 months</option>
                            <option value="1-years" <% if $DateFilter == '1-years' %>selected="selected"<% end_if %>>From the last year</option>
                        </select>
                    </div>

                </div>
                <% end_if %>

                <div class="tileToggle">
                    <a href="#" class="tileView <% if $Layout == 'Tile' %>active<% end_if %>">Tile view</a>
                    <a href="#" class="listView <% if $Layout == 'List' %>active<% end_if %>">List view</a>
                </div>

                <div class="tileWrap <% if $Layout == 'Tile' %>layoutTiles<% else %>layoutList<% end_if %>">

                    <% if $CurrentPages %>
                        <% loop $CurrentPages %>
                            $Tile($Up.ItemStyle)
                        <% end_loop %>

                        <% if not $DisableSeeMore %>
                            <% if $CurrentPages.MoreThanOnePage %>
                                <% loop $OtherPages %>
                                    $Tile($Up.ItemStyle, true)
                                <% end_loop %>
                            <% end_if %>
                        <% end_if %>
                    <% end_if %>

                </div>
                <% if $CurrentPages.MoreThanOnePage %>
                    <% if not $DisableSeeMore %>
                        <div class="drawer">
                               <a href="#" class="handle">See more</a>
                               <a href="#" class="close">See less</a>
                        </div>
                    <% end_if %>
                <% end_if %>
            </div>

        </div><!-- end .pop -->
    </div>
</div>
