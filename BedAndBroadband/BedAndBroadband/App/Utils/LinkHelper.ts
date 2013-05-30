/// <reference path="../references.ts" />
module Hypermedia {
    export interface ILink {
        href: string;
        rel: string;
    }
    export interface IResourceWithLinks {
        links: ILink[];
    }
    export function getLink(resource: IResourceWithLinks, rel: string) {
        var link = resource.links.find((l: ILink) => l.rel === rel);
        return link ? link.href : null;
    }
}