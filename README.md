andyet.com
==========

![](http://badger.andyet.com/autodeploy/andyet.com)

__Please submit changes to this repo only via a pull request.__

## andyet.com subdomains

andyet.com has a few subdomains. You can find their repos here:
- [blog.andyet.com](https://github.com/andyet/blog.andyet.com) - &yet blog (blog post repo is [here](https://github.com/andyet/blog-posts))
- [labs.andyet.com](https://github.com/andyet/labs.andyet.com) - &yet Labs (open source projects, etc)
- [community.andyet.com](https://github.com/andyet/community.andyet.com) - community support & giving site
- [live.andyet.com](https://github.com/andyet/live.andyet.com) - for live events
- [apps.andyet.com](https://github.com/andyet/apps.andyet.com) - &yet auth, accounts, and apps


## Adding and editing bios

Bios can be found in the [team](https://github.com/andyet/andyet.com/tree/master/team)

To add a new bio, add a ``name.md`` file in the [team](https://github.com/andyet/andyet.com/tree/master/team) folder with this syntax:

```
---
name: Firsty Lasterton
slug: firsty
photo: firsty.jpg
title: Chief First Officer
...

Once upon a time, Firsty was a little child.

Then we hired them at &yet.

```

Add images in the following locations and sizes:
- [public/images/team/square](https://github.com/andyet/andyet.com/tree/master/public/images/team/square) -- Should be 324x324 pixel jpg
- [public/images/team/](https://github.com/andyet/andyet.com/tree/master/public/images/team) -- full size original


## Editing site content

Most site content is written in Jade templates which produce the site HTML. Jade templates are stored in the [views](https://github.com/andyet/andyet.com/tree/master/views) folder.

Note that these *aren't* markdown files and the syntax and whitespace you use *does* matter quite a bit. See the [Jade documentation](http://jade-lang.com) to see how to use Jade.

## Archival site content 

[2014 andyet.com site content](https://gist.github.com/renrutnnej/e40ab1d5ce27e0f03063)
