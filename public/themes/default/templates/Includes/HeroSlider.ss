<div class="slideshow">
    <div class="item-container">
        <div class="slider-control-container">
            <div class="slider-control prev"></div>
            <div class="slider-control next"></div>
        </div>
        <% loop $HomeSlideshowItems %>
            <div class="item position-10" style="background-image:url('$Image.URL');">
                <div class="slide-text multiple">
                    <p>Inspiring food made with integrity to match its quality.</p>
                </div>
            </div>
        <% end_loop %>
        <div class="cycle-pager"></div>
    </div>
</div>