<section class="promo-box">
    <% loop $PromoBox %>
        <% include ContentBox Pos=$Pos, EvenOdd=$EvenOdd, Last=$Last %>
    <% end_loop %>
</section>