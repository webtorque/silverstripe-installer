<div class="tile image $Hidden $ExtraCSS">
    <a href="$Link" class="hit"></a>
    <div class="tileHead">
        <div class="img" <% if $DisplayTileImage %>style="background-image: url('<% if $First %>$DisplayTileImage.CroppedImage(630,292).AbsoluteURL<% else %>$DisplayTileImage.CroppedImage(310,145).AbsoluteURL<% end_if %>');"<% end_if %>></div>
    </div>
    <div class="tileBody">
        <p>$ImageTileTitle.LimitCharacters(110)</p>
    </div>
    <div class="shadow"></div>
    <div class="banner"></div>
</div>