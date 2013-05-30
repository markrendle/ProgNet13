var Hypermedia;
(function (Hypermedia) {
    function getLink(resource, rel) {
        var link = resource.links.find(function (l) {
            return l.rel === rel;
        });
        return link ? link.href : null;
    }
    Hypermedia.getLink = getLink;
})(Hypermedia || (Hypermedia = {}));
