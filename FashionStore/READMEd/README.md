# Client Server Architecture

1. Client is a computer which is capable of sending request to other computers present in interenet.
2. We say client as a computer but in reality browser software is termed as a client.

# Server

1. It is a computer which has a capability to provide output to any number of clients.
2. Normally a server computer would be referred as high configuration computer.
3. Inside the server computer we install a server software called "web-server" (Ex's., Tomcat, glassfish, wildfly, Jboss)

Installing nodejs will promote a build tool through which we can automate the process of taking third party libraries from different websites to our project with the help of a command called "npm"

Q. What is a website, internet, web?

# HTML Parsing

On a browser to display the content. Our requirement we need to markup our content.

To markup the content on a browser, we need language called HTML.

# Evolution of HTML

1. GML - It stnads for Generic Markup Langauge
2. SGML - It stands for Standard Generic Markup Langauge, it is add on to the GML.
3. Tim Berner Lee introduced a new markup language called as HTML which is a subset of SGML.
4. Initially HTML was a open-source langauge.
5. HTML was introduced as a communicating langauge to web by Tim Berner Lee.
6. HTML is maintained by a community called "WhatWG"
7. HTML-4 version didn't gave importance for SEO and responsive design.
8. In HTML-5 different <u>semantics</u>(elements) to give importance for SEO and resposive designs.

- NOTE: SEO refers to Search Engine Optimisation

8. Whenever we type some content on a browser which needs to be searched on google search engine uses SEO technique(Robos like bot, web crawlers, web spider,... etc)

### Categories of HTML elements

1. Normal Elements - `<b>`
2. Void Elements - `<img>`
3. RC(Rich Context) Data Elements

Ex.:

```
    <textarea>
        <p>Hello pw'ian</p>
    </textarea>
```

Ouptut:
![Output:](image.png)

4. Raw Text Element

Ex.:

```
Temperature25C 4500/-
```

```
Temperature25&deg;C &#8377;4500/-
```

![alt text](image-1.png)

5. Foreign Elements - ex. svg, mathml

## Structure of HTML

Arranging the elements of HTML in a hierarchial way to a present on a webpage is called "DOM"(Document Object Model).

Skeletal Structre:

```
<html>
    <!-- Document scope -->
    <head>
    </head>

    <body>
    </body>
</html>
```

The content presented in head section is mainly used for SEO and responsive design.

The elements which can be written inside `<head>` section are:

1. `<title>`
2. `<link>`
3. `<meta>`
4. `<style>`
5. `<script>`

- `<!DOCTYPE html>` - It is indication to browser engine that in the body section we use elements of html-5.
- `<html lang = "en-IN">` - It is indication to browser engine that the output should be feasible to the end-user in a particular format.

## Body Section(Dynamic content)

- Attributes of body tag:

1. bgcolor - this attribute is used to set the background color for the body section
2. text - this attribute is used to set a different color valuefor the content to be presented on a webpage.

Ex.: `<body bgcolor = "black" text = "white"> </body>`

- To control the elements of a webpage after the presentation we go for CSS(Styling language)

CSS attributes for background:

1. background-repeat : repeat| non-repeat| repeat-x| repeat-y
2. background-size : contain| cover| auto |width&height in pixels
3. background-position : top| center| right| left
4. background-attachment : fixed | scroll

### HTML5 new semantics(Elements)

1. Header
2. Section
3. Nav
4. Main(Entry point)
5. Article
6. Figure
7. FigCaption
8. Dialog
9. Aside
10. Footer
11. Div
12. Span

## Div v/s Span

The `<span>` tag is myuch like the `<div>` element, but `<div>` is a bloack-level element and `<span>` is an inline element.

Padding is used to create space around an element's content, Inside

1. To align the content in column wise in css we use have an option called `display: flex;`
2. We can control the attributes of font through css using

   - `font-family:`, `font-style:`, `font-size:`, `font-weight:`,

3. For a span element width property can't be applied directly (no effect). To see the effect we use attribute called `display: inline-block;`

- Default screen width is 1200px, so max no. of columns in a page is 12.

### Different Types of css selector

1. Selecting child and sibling in css

   :

   parent child { ==> Child Selector

   }

   ElementA + ElementB { => Adjacent Building

   }

   ElementA ~ ElementB { => All elements after specific

   }

- For any image to be blurred and if the content has to be presented on a blurred image we go for an attribute called `background-color: rgba();`, "a" stands for alpha and range of alpha is 0 to 1.
- To display any content to the center (Horizontal and Vertical):

  1. Keep all the the content in one contaier
  2.

  ```
  <body>
      <div>
          // Your content here
      </div>
  </body>
  ```

  3. Body is the container here which would display the contents center with attributes

  ```
  body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
  }
  ```

  Note:

  - justify-content

- Figcaption element is used by searche engine to load the image as a search result for the end user.

```
<figure>
        <div>
            <!-- PLACE IMAGE -->
        </div>

        <figcaption>
            Browser Image
        </figcaption>
    </figure>
```

- Element designed for coding platforms

  1. `<code></code>` - To indicate the presentation content is for programming
  2. `<var></var>` - To indicate the browser engine that it is a variable
  3. `<samp></samp>` - To indicate the description about program we use `</samp>` element.

- What is difference b/w `<br>` and `<br/>`?

1. There is not such element called "`<br>`" in HTML.

- `<pre>` - It is used to preserve the whitespaces in particular container

- `&nbsp;` - It is used to mark the spaces set by the user for any element

#### Small Text and Big Text

- `<small>content</small>` :: It sets letter size smaller
- `<big>content</big>` :: It sets letter size large

#### Details and summary

Syntax:

```
<details>
    <summary>content</summary>
</details>
```

#### Details and summary

- It is used to display the content in detail only when required.
- It allows to expand and collapse your content.
- It saves the screen space

## Data List with Terms and definitions:

```
<dl>
    <dt>Term</dt>
    <dd>Definition</dd>
    <dt>Term</dt>
    <dd>Definition</dd>
    <dd>Definition</dD>
</dl>
```

Note:

- `<dt>` and `<dd>` will have some default alignment, so it is easy for presentation.
- `<dl>` has the capability to display in columns using grid (`<dt>` -> one column an `<dd>` -> one column)

Note:

```
dt {
     position: sticky;
     top: 0;
}
```

NOte:
In Css we can set shadow to any container by using box-shadow attribute.

- Box shadow will have 4 values

```
{
    box-shadow: horizontal vertical blur color;
}
```

## Heading elements in HTML

- Heading elements are mainly used to define headings and to describe a <u>topic</u> in a webpage
- Heading element default behaviour is:

  1. Display -> block
  2. font-weight -> Bold
  3. font-size -> vary according to hn : 1 to 6 -> the size will decrease

Q. 3 Can we change the apperance of `<hn>` tags?

Ans :

> Through css we can change the default behaviour.

```
h1 {
    font-size: 50px;
    font-weight: lighter;
    color: blue;
}
```

Q. 4 Can we remove the default style defined for heading?

Ans:

> Yes it can be made possible with the help of css Inheritence.

```
h1 {
    text-align: center;
    display: unset;
    font-size: unset;
    font-weight: unset;
}

h2 {
    all: unset;
}
```

## Working with paragraphs
1. `<p></p>` - To present the content in the form of paragraph we use `<p>` element.
- It supports "align" attribute, which can set text left, center, right or justified.
- paragraphs will have a line break before and after.

2. `<blockquote></blockquote> ` - It is used to present summary of content in. By default the behaviour would have left right indentation and some margin bvalue for blockquote.

Q. How to set the first-line indent for paragraph or blockquote?
using css attribute `text-indent: __px`

Q. how to set line space, word space, character space in a paragraph

Using CSS attributes `line-height:, word-spacing:, letter-spacing:`.

Ex.:

```
blockquote {
    text-indent: 50px;
    line-height: 30px;
    word-spacing: 7px;
    letter-spacing: 3px;
}
```

Q. How to set dropcap?

- By using the following style we can set dropcap:
    - Access the first letter using the class : first-letter
    - After accessing the firstletter apply fonts[size, weight, family]
    - Apply css float


- Difference between display: grid; vs column: ; of a css attribute

    1. display: grid; would display the content column wise in the given frame width(column ratio).
    2. columns:; this attribute take number of columns as the input and display the content in continuous

## Text Formatting In HTML
- We can change the text formatting using font
font: we can change the face (family), size and color.

face - font family

color - It represents color name and color code

size - 1 to 7 (increasing order)
```
<font face = " " size = "" color = ""> Your Text </font>  
````

- HTML attribute for style


    |Tag|Design Team| Review Team|Output|
    |----|------|-------|-------|
    |Bold|`<b>` |`<strong>`|<b>Bold</b>|
    |Italic|`<i>`|`<em>`|<i>Italic</i>|
    |Underline|`<u>`|`<ins>`|<u>Underline</u>|
    |To strike down|`<strike>`|`<del>`| <del>Strike</del>|

- What are web safe fonts:

> These fonts are such fonts which would be available in every machine and it can't be deleted .


Ex: sans-serif, mono space, serriff

     
## Ordered And undorderd List

- Order list will add auto numbering for a list of option, which can update automatically when your add or delete items.
- Orders list is defined by using `<ol>` element
- Itemns in list are defined by using `<il>`

Syntax:

```
<ol>
    <li>Itme-1</li>
    <li>Itme-2</li>
<ol>
```

Note : Default numbering will be given for items

`type` : It specified the numbering type, which can be: a, A, i, I, 1(default)

start[number] - It defines the numbering level to start with.

## Nesting in list elements


Bad Code
```
<ol>
    <li>Front End</li>
        <ol type = "a">
            <li>HTML</li>
            <li>CSS</li>
        </ol>

    <li>Back End</li>
        <ol type = "a">
            <li>Node JS</li>
            <li>MongoDB</li>
        </ol>
    
</ol>
```
![Output](./src/list.png)

Good Code
```
<ol>
    <li>Front End
        <ol type = "a">
            <li>HTML</li>
            <li>CSS</li>
        </ol>
    </li>

    <li>Back End
        <ol type = "a">
            <li>Node JS</li>
            <li>MongoDB</li>
        </ol>
    </li>

</ol>
```

![Output](./src/list.png)

Questions:
1. How to remove numbering in orderlist?

    Ans 
    > It is possible to remove numbering of ordered list element throught a css attribute called `list-style: none;`

2. How to create scrollable list?
    Ans
    > Keep a Border, Keep a proper width and height as per the content area. Using an css attribute `overflow: hidden | scroll | auto`.
    

3. How to display list items inline?
    
4. How to display li in columnss wise?


    i. 
```
ol {
    display : grid;
    grid-template-columns: 6fr 6fr;
}
``` 


```
ol {
    columns: 2;
}
```
5. How to change the options in ordered list?


## Unordered List
Syntax:

```
<ul type = "square">
    <li>Web Server</li>
    <li>Web Site</li>
    <li>Web Page</li>
</ul>
```

How to set up custom bullets?

Ans:  We can do by using `list-style-image:;` attribute of css.

## Pagination

-- It refers to the process of displaying the records by splitting them into <u>pages</u>.  

```
<ul>
    <li><span>&laquo;</span></li>
    <li><span>1</span></li>
    <li><span>2</span></li>
    <li><span>3</span></li>
    <li><span>4</span></li>
    <li><span>5</span></li>
    <li><span>....</span></li>
    <li><span&raquo;</span></li>
</ul>
```

We can use only those images from google which are filtered using : Creative common licenses. So that our website we don't get copyright.

from -> tools

![alt text](image.png)

> Different types of images:

|Sr Number| Abbreviation| FileFormat| MIMEType| FileExtension|
|---------|-------------|-----------|--------|--------------|
|1.|APNG | Animated Portable Network Graphics| image/png| .apng|
|2. |BMP| Bitmap File| image/bmp| .bmp|
|3. |GIF| Graphics Interchange Formage| image/gif| .gif|
|4. | ICO| Microsoft Icon| image/x-icon| .ico, .cur|
|5. | JPEG| Joint Phototgraphic Expert Group| image/jpeg| .jpg. jpeg, .jtif, .pjpeg, .pjp|
|6. | PNG| Portable Network Graphics| image/png| .png|
|7. |SVG| Scalar Vector Graphics| image/svg+xml| .svg|
|8. |TIFF| Tagged Image File Format|image/tiff|.tiff, .tif|
|9. | WEBP| Web Picture Format| image/webp|.webp|


Q. What is MIME Type ?

- MIME stands for "Multipurpose Internet Mail Extension"

- Server upon sending the information to the browser, it will also send what type of information is being send.

- To inform the type of information we go for MIME Type.

Purpose of different types of images:

|Type| Purpose|
|--|--| 
|PNG| High resolution(More space), Suitable for downloads|
|JPG| Compressed Image Format(Less Space) , Good for on screen presentation|
|GIF| Low Resolution, used for animations|
|SVG| Ex. : 1. Google Map, 2. Bootstrap Icons,  not pixel based, high zoom quality|
|WEBP|If we try to save an image it saves the entire page. Image alone can't be captured |

Embedding an image in webpage:

- It is a void element
- `<img>` is configure with following attributes
`<img src = "" alt = "" width = "" height = "" >`

Ex 1:

```
<figure>
        <img src="./image.png" alt="can't display" title="iphone" height="100" width="100">
        <figcaption>IPHONE</figcaption>
    </figure>
```

Card 

Standard Card Templated - 

<div style = "border: 1px solid white">
<h2 align="center" style = "border: 1px solid white">Card Header</h2>

<div style = "display:flex; justify-content:center; border: 1px solid white;" >
    Card Body
</div>

<div style = "border: 1px solid white;">
Card Footer
</div>
</div>


<hr>

![alt text](image-1.png)


### What are fluid images?

- If we set the width and height of an image in percentage then the image will be adjusted to the browser window. If the image is adjusted to browser window through percentage then such images are termed as fluid images 