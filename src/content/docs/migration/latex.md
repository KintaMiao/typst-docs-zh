---
title: 从 LaTeX 迁移
description: 学习如何从 LaTeX 迁移
prev:
    link: /welcome/
    label: 欢迎来到 Typst
next: false
---

如果你曾经使用过LaTeX并想尝试Typst，本页面是一个很好的起点。我们将从用户角度探讨这两个系统之间的主要差异。虽然Typst并非基于LaTeX构建且语法不同，但你将学会如何利用你的LaTeX技能快速入门。

与LaTeX一样，Typst是一种基于标记的排版系统：你在文本文件中编写文档，并使用命令和其他语法进行标记。然后，你使用编译器将源文件排版为PDF。然而，Typst在几个方面与LaTeX不同：首先，Typst对常见任务使用更专门的语法（就像你在Markdown中可能了解的那样）。Typst的命令也更加原则化：它们都以相同方式工作，因此与LaTeX不同，你只需理解几个通用概念，而无需为每个包学习不同的约定。此外，Typst比LaTeX编译更快：编译通常只需几毫秒，而不是几秒，因此Web应用和编译器都能提供即时预览。

在下文中，我们将介绍从LaTeX切换到Typst的用户在编写文档时最常遇到的一些问题。如果你更喜欢逐步了解Typst，可以查看我们的[教程]。

## 安装
你可以通过两种方式使用Typst：在[我们的Web应用](https://typst.app/signup/)中或[在计算机上安装编译器](https://github.com/typst/typst/releases)。当你使用Web应用时，我们会提供一个开箱即用的协作编辑器并在浏览器中运行Typst，无需安装。

如果你选择在计算机上使用Typst，可以下载编译器作为一个小的单一二进制文件，任何用户都可以运行，无需root权限。与TeX Live等流行的LaTeX发行版不同，包在首次使用时下载并缓存在本地，使你的Typst安装保持精简。你可以使用自己的编辑器，并决定使用本地编译器时文件的存储位置。

## 如何创建新的空白文档？
这很简单。你只需创建一个新的空白文本文件（文件扩展名为`.typ`）。开始不需要任何样板代码。只需直接开始编写文本。它将被设置在空白的A4尺寸页面上。如果你使用Web应用，点击"+ 空白文档"以创建包含文件的新项目并进入编辑器。[段落换行]($parbreak)的工作方式与LaTeX相同，只需使用空行。

```typ
Hey there!

Here are two paragraphs. The
output is shown to the right.
```

如果你想从现有的LaTeX文档开始，可以使用[Pandoc](https://pandoc.org)将源代码转换为Typst标记。这种转换也已集成到我们的Web应用中，因此你可以上传`.tex`文件在Typst中开始你的项目。

## 如何创建章节标题、强调文本等？
LaTeX使用`\section`命令创建章节标题。嵌套标题通过`\subsection`、`\subsubsection`等表示。根据你的文档类，还可能有`\part`或`\chapter`。

在Typst中，[标题]($heading)更加简洁：在标题行前加上等号和空格即可获得一级标题：`= 引言`。如果需要二级标题，使用两个等号：`== 本文中`。通过添加更多等号，你可以将标题嵌套到任意深度。

强调（通常以斜体显示）通过用`_下划线_`包围文本表示，而强强调（通常以粗体显示）则使用`*星号*`。

以下是LaTeX中常用标记命令及其Typst等效命令的列表。你也可以查看[完整语法速查表]($syntax)。

| 元素             | LaTeX                      | Typst                   | 参见        |
|:-----------------|:---------------------------|:------------------------|:------------|
| 强强调           | `\textbf{strong}`          | `*strong*`              | [`strong`]  |
| 强调             | `\emph{emphasis}`          | `_emphasis_`            | [`emph`]    |
| 等宽/代码        | `\texttt{print(1)}`        | `` `print(1)` ``        | [`raw`]     |
| 链接             | `\url{https://typst.app}`  | `https://typst.app/`  | [`link`]    |
| 标签             | `\label{intro}`            | `<intro>`             | [`label`]   |
| 引用             | `\ref{intro}`              | `@intro`              | [`ref`]     |
| 文献引用         | `\cite{humphrey97}`        | `@humphrey97`         | [`cite`]    |
| 项目符号列表     | `itemize`环境              | `- 列表`               | [`list`]    |
| 编号列表         | `enumerate`环境            | `+ 列表`               | [`enum`]    |
| 术语列表         | `description`环境          | `/ 术语: 列表`         | [`terms`]   |
| 图表             | `figure`环境               | `figure` 函数            | [`figure`]  |
| 表格             | `table`环境                | `table` 函数             | [`table`]   |
| 公式             | `$x$`, `align` / `equation`环境 | `[$x$]`, `[$ x = y $]` | [`equation`] |

[列表]($list)在Typst中不依赖于环境。相反，它们像标题一样有轻量级语法。要创建无序列表(`itemize`)，在每项行首加上连字符：

````typ
To write this list in Typst...

```latex
\begin{itemize}
  \item Fast
  \item Flexible
  \item Intuitive
\end{itemize}
```

...just type this:

- Fast
- Flexible
- Intuitive

````

通过正确缩进可以嵌套列表。在项目之间添加空行会产生[更宽松]($list.tight)的列表间距。

要获得[编号列表]($enum) (`enumerate`)，请使用`+`代替连字符。对于[术语列表]($terms) (`description`)，请使用`/ 术语: 描述`。

## 如何使用命令？
LaTeX大量依赖命令（以反斜杠为前缀）。它使用这些_宏_来影响排版过程并插入和操作内容。一些命令接受参数，这些参数通常用花括号包围：`\cite{rasmus}`。

Typst区分[标记模式和代码模式]($scripting/#blocks)。默认是标记模式，你在此编写文本并应用诸如`*粗体文本的星号*`等语法结构。而代码模式则类似于Python等编程语言，提供输入和执行代码段的选项。

在Typst的标记中，你可以使用井号(`#`)切换到单个命令（或更准确地说，_表达式_)的代码模式。这是调用函数的方式，例如将项目拆分为不同的[文件]($scripting/#modules)或根据某些[条件]($scripting/#conditionals)渲染文本。在代码模式中，可以使用方括号包含普通标记[_内容_]($content)。在代码模式中，此内容被视为变量的普通值。

```typ
First, a rectangle:
#rect()

Let me show how to do
#underline([_underlined_ text])

We can also do some maths:
#calc.max(3, 2 * 4)

And finally a little loop:
#for x in range(3) [
  Hi #x.
]
```

函数调用总是涉及函数名称（`rect`、`underline`、`calc.max`、`range`），后跟括号（与LaTeX不同，在LaTeX中如果宏不需要参数，方括号和花括号是可选的）。括号内传递的参数列表取决于具体函数，并在[参考文档](/reference)中指定。

### 参数
一个函数可以有多个参数。有些参数是位置参数，即你只需提供值：函数`#lower("SCREAM")`将其参数转换为全小写。许多函数使用命名参数而不是位置参数以提高可读性。例如，矩形的尺寸和描边是用命名参数定义的：

```typ
#rect(
  width: 2cm,
  height: 1cm,
  stroke: red,
)
```

通过先输入参数名称（上面是`width`、`height`和`stroke`），然后是冒号，再跟上值（`2cm`、`1cm`、`red`）来指定命名参数。你可以在每个函数的[参考页面]($reference)或键入时的自动补全面板中找到可用的命名参数。命名参数类似于某些LaTeX环境的配置方式，例如，你会输入`\begin{enumerate}[label={\alph*)}]`来开始一个标签为`a)`、`b)`等的列表。

通常，你希望向函数提供一些[内容]。例如，LaTeX命令`\underline{替代方案A}`在Typst中将转换为`[#underline([替代方案A])]`。方括号表示该值是[内容]。在这些括号内，你可以使用普通标记。然而，对于一个相当简单的结构来说，这有很多括号。这就是为什么你也可以将尾随的内容参数移到括号后面（如果括号为空，可以省略括号）。

```typ
Typst is an #underline[alternative]
to LaTeX.

#rect(fill: aqua)[Get started here!]
```

### 数据类型
你可能已经注意到参数具有不同的数据类型。Typst支持许多[数据类型]($type)。下面是一个表格，列出了一些最重要的类型及其写法。要指定这些类型的任何值，你必须处于代码模式！

| 数据类型                        | 示例                              |
|:--------------------------------|:----------------------------------|
| [内容]($content)                | `[*快速* 排版]`                 |
| [字符串]($str)                  | `"Pietro S. Author"`            |
| [整数]($int)                    | `23`                            |
| [浮点数]($float)                | `1.459`                         |
| [绝对长度]($length)             | `12pt`, `5in`, `0.3cm`, ... |
| [相对长度]($ratio)              | `65%`                           |

内容和字符串的区别在于内容可以包含标记，包括函数调用，而字符串真的只是一串普通字符。

Typst提供了[控制流结构]($scripting/#conditionals)和[运算符]($scripting/#operators)，如用于添加内容的`+`或用于检查两个变量是否相等的`==`。

你也可以将值，包括函数，存储在自己的[变量]($scripting/#bindings)中。这对于对它们进行计算、创建可重用的自动化或多次引用一个值很有用。变量绑定是通过let关键字完成的，其工作方式类似于`\newcommand`：

```typ
// 存储整数`5`。
#let five = 5

// 定义一个
// 递增值的函数。
#let inc(i) = i + 1

// 引用变量。
I have #five fingers.

If I had one more, I'd have
#inc(five) fingers. Whoa!
```

### 影响剩余文档的命令
在LaTeX中，一些命令如`\textbf{粗体文本}`接收花括号中的参数，仅影响该参数。其他命令如`\bfseries 粗体文本`充当开关（LaTeX称之为声明），改变文档或当前作用域中所有后续内容的外观。

在Typst中，同一个函数可以用于影响文档剩余部分、一个块（或作用域）或仅其参数的外观。例如，`#text(weight: "bold")[粗体文本]`只会加粗其参数，而`#set text(weight: "bold")`将加粗从当前块结束或文档结束（如果没有块）的任何文本。函数的效果基于它是用于调用还是[设置规则]($styling/#set-rules)而立即明显。

```typ
I am starting out with small text.

#set text(14pt)

This is a bit #text(18pt)[larger,]
don't you think?
```

设置规则可以出现在文档中的任何位置。它们可以被视为其相应函数的默认参数值：

```typ
#set enum(numbering: "I.")

Good results can only be obtained by
+ following best practices
+ being aware of current results
  of other researchers
+ checking the data for biases
```

`+`是[`{enum}`]($enum)函数调用的语法糖（可以将其视为缩写），我们在上面对其应用了设置规则。[大多数语法都以这种方式链接到函数]($syntax)。如果你想对元素进行超出其参数允许的样式设置，可以使用[显示规则]($styling/#show-rules)（类似于`\renewcommand`）完全重新定义其外观。

你可以使用`text`函数的[`font`]($text.font)、[`style`]($text.style)和[`weight`]($text.weight)参数来实现LaTeX命令如`\textbf`、`\textsf`、`\rmfamily`、`\mdseries`和`\itshape`的效果。文本函数可以在设置规则（声明风格）中使用，也可以带有内容参数。要替换`\textsc`，可以使用[`smallcaps`]函数，它将其内容参数渲染为小型大写字母。如果你想以声明风格使用它（如`\scshape`），可以使用[_所有内容_]($styling/#show-rules)显示规则，将该函数应用于作用域的其余部分：

```typ
#show: smallcaps

Boisterous Accusations
```

## 如何加载文档类？
在LaTeX中，你通过`\documentclass{article}`命令开始你的主`.tex`文件，以定义文档的外观。在该命令中，你可能已将`article`替换为其他值，如`report`和`amsart`，以选择不同的外观。

使用Typst时，你使用[函数]($function)来设置文档样式。通常，你使用提供函数的模板来设置整个文档的样式。首先，你从模板文件导入该函数。然后，将其应用于整个文档。这是通过[显示规则]($styling/#show-rules)实现的，该规则将后续文档包装在给定函数中。以下示例说明了它的工作原理：

```typ:single
>>> #let conf(
>>>   title: none,
>>>   authors: (),
>>>   abstract: [],
>>>   doc,
>>> ) = {
>>>   set text(font: "Libertinus Serif", 11pt)
>>>   set par(justify: true)
>>>   set page(
>>>     "us-letter",
>>>     margin: auto,
>>>     header: align(
>>>       right + horizon,
>>>       title
>>>     ),
>>>     numbering: "1",
>>>     columns: 2
>>>   )
>>>
>>>   show heading.where(
>>>     level: 1
>>>   ): it => block(
>>>     align(center,
>>>       text(
>>>         13pt,
>>>         weight: "regular",
>>>         smallcaps(it.body),
>>>       )
>>>     ),
>>>   )
>>>   show heading.where(
>>>     level: 2
>>>   ): it => box(
>>>     text(
>>>       11pt,
>>>       weight: "regular",
>>>       style: "italic",
>>>       it.body + [.],
>>>     )
>>>   )
>>>
>>>   place(top, float: true, scope: "parent", {
>>>     set align(center)
>>>     text(17pt, title)
>>>
>>>     let count = calc.min(authors.len(), 3)
>>>     grid(
>>>       columns: (1fr,) * count,
>>>       row-gutter: 24pt,
>>>       ..authors.map(author => [
>>>         #author.name \
>>>         #author.affiliation \
>>>         #link("mailto:" + author.email)
>>>       ]),
>>>     )
>>>
>>>     par(justify: false)[
>>>       *摘要* \
>>>       #abstract
>>>     ]
>>>   })
>>>
>>>   set align(left)
>>>   doc
>>> }
<<< #import "conf.typ": conf
#show: conf.with(
  title: [
    改进建模方法
  ],
  authors: (
    (
      name: "Theresa Tungsten",
      affiliation: "Artos Institute",
      email: "tung@artos.edu",
    ),
    (
      name: "Eugene Deklan",
      affiliation: "Honduras State",
      email: "e.deklan@hstate.hn",
    ),
  ),
  abstract: lorem(80),
)

让我们通过在这里添加
富有洞察力的段落
开始撰写这篇文章！
>>> #lorem(500)
```

[`{import}`]($scripting/#modules)语句使来自另一个文件的[函数]($function)（和其他定义）可用。在此示例中，它从`conf.typ`文件导入`conf`函数。该函数将文档格式化为会议论文。我们使用显示规则将其应用于文档，并配置文章的一些元数据。应用显示规则后，我们可以立即开始撰写文章！

你也可以使用来自Typst Universe（这是Typst的CTAN等效物）的模板，使用类似这样的导入语句：`[#import "@preview/elsearticle:0.2.1": elsearticle]`。查看单个模板的文档以了解其模板函数的名称。Typst Universe中的模板和包在首次使用时会自动下载。

在Web应用中，你可以选择从Typst Universe上的模板创建项目，甚至可以使用模板向导创建自己的模板。在本地，你可以使用`typst init` CLI从模板创建新项目。查看在Typst Universe上发布的[模板列表]($universe/search/?kind=templates)。你还可以查看[`awesome-typst`仓库](https://github.com/qjcg/awesome-typst)，找到Universe中不可用的社区模板。

你也可以[创建自己的自定义模板]($tutorial/making-a-template)。它们比相应的LaTeX `.sty`文件短几个数量级且更易读，所以不妨试试！

<div class="info-box">

函数是Typst的"命令"，可以将参数转换为输出值，包括文档_内容_。函数是"纯"的，这意味着它们除了创建输出值/输出内容外不能有任何效果。这与LaTeX宏形成鲜明对比，LaTeX宏可以对你的文档产生任意影响。

要让函数设置整个文档的样式，显示规则会处理它后面的所有内容，并使用结果作为参数调用冒号后指定的函数。`.with`部分是一个_方法_，它获取`conf`函数并在将其传递给显示规则之前预先配置其一些参数。
</div>

## 如何加载包？
Typst是"开箱即用"的，因此许多流行LaTeX包的等效功能已内置。下面，我们编译了一个表格，列出了经常加载的包及其对应的Typst函数。

| LaTeX包                        | Typst替代方案                          |
|:-------------------------------|:---------------------------------------|
| graphicx, svg                  | [`image`]函数                          |
| tabularx, tabularray           | [`table`], [`grid`]函数                |
| fontenc, inputenc, unicode-math| 直接开始编写！                         |
| babel, polyglossia             | [`text`]($text.lang)函数: `[#set text(lang: "zh")]` |
| amsmath                        | [数学模式]($category/math)             |
| amsfonts, amssymb              | [`sym`]($category/symbols)模块和[语法]($syntax/#math) |
| geometry, fancyhdr             | [`page`]函数                           |
| xcolor                         | [`text`]($text.fill)函数: `[#set text(fill: rgb("#0178A4"))]` |
| hyperref                       | [`link`]函数                           |
| bibtex, biblatex, natbib       | [`cite`], [`bibliography`]函数         |
| lstlisting, minted             | [`raw`]函数和语法                      |
| parskip                        | [`block`]($block.spacing)和[`par`]($par.first-line-indent)函数 |
| csquotes                       | 设置[`text`]($text.lang)语言并输入`["]`或`[']` |
| caption                        | [`figure`]函数                         |
| enumitem                       | [`list`], [`enum`], [`terms`]函数      |

尽管_许多_功能已内置，但并非所有功能都能实现。这就是为什么Typst有自己的[包生态系统]($universe)，社区可以在其中分享其创作和自动化。以_cetz_包为例：此包允许你创建复杂的绘图和图表。要在文档中使用cetz，只需编写：

```typ
#import "@preview/cetz:0.2.1"
```

（`@preview`是一个_命名空间_，在包管理器仍处于早期和实验阶段时使用。将来会被替换。）

除了官方包中心外，你可能还想查看[awesome-typst仓库](https://github.com/qjcg/awesome-typst)，它编译了一份为Typst创建的精选资源列表。

如果你需要从项目中的另一个文件加载函数和变量，例如使用模板，可以使用相同的[`import`]($scripting/#modules)语句，但使用文件名而不是包规范。要包含另一个文件的文本内容，可以使用[`include`]($scripting/#modules)语句。它将检索指定文件的内容并将其放入文档中。

## 如何输入数学公式？
要进入Typst的数学模式，只需将方程用美元符号括起来。通过在方程内容与其包围的美元符号之间添加空格或换行，可以进入显示模式。

```typ
从$1$到$n$的数字之和是：

$ sum_(k=1)^n k = (n(n+1))/2 $
```

[数学模式]($category/math)的工作方式与常规标记或代码模式不同。数字和单个字符会原样显示，而多个连续（非数字）字符将被解释为Typst变量。

Typst在数学模式中预定义了许多有用的变量。所有希腊字母（`alpha`、`beta`等）和一些希伯来字母（`alef`、`bet`等）都可以通过其名称使用。一些符号还可以通过简写使用，如`<=`、`>=`和`->`。

请参阅[符号页面]($reference/symbols)以获取完整符号列表。如果缺少符号，也可以通过[Unicode转义序列]($syntax/#escapes)访问。

符号的替代和相关形式通常可以通过在句点后[附加修饰符]($symbol)来选择。例如，`arrow.l.squiggly`插入一个波浪形向左箭头。如果你想在表达式中插入多字母文本，请用双引号将其括起来：

```typ
$ delta "if" x <= 5 $
```

在Typst中，分隔符会根据其表达式自动缩放，就像在LaTeX中隐式插入了`\left`和`\right`命令一样。你可以使用[`lr函数]($math.lr)自定义分隔符行为。要防止一对分隔符缩放，可以用反斜杠转义它们。

Typst会自动将斜杠`/`周围的项设置为分数，同时尊重运算符优先级。所有未被分数冗余的圆括号将在输出中显示。

```typ
$ f(x) = (x + 1) / x $
```

[上下标]($math.attach)在Typst和LaTeX中的工作方式类似。`{$x^2$}`将产生上标，`{$x_2$}`产生下标。如果你想在上下标中包含多个值，请将其内容用括号括起来：`{$x_(a -> epsilon)$}`。

由于数学模式中的变量不需要以`#`（或LaTeX中的`\`）为前缀，你也可以在不使用这些特殊字符的情况下调用函数：

```typ
$ f(x, y) := cases(
  1 "if" (x dot y)/2 <= 0,
  2 "if" x "is even",
  3 "if" x in NN,
  4 "else",
) $
```

上面的示例使用[`cases函数]($math.cases)来描述f。在cases函数中，参数使用逗号分隔，参数也被解释为数学。如果你需要将参数解释为Typst值，请在其前面加上`#`：

```typ
$ (a + b)^2
  = a^2
  + text(fill: #maroon, 2 a b)
  + b^2 $
```

你可以在数学模式中使用所有Typst函数并插入任何内容。如果你想让它们正常工作，在参数列表中使用代码模式，可以在调用前加上`#`。现在没人能阻止你使用矩形或表情符号作为变量了：

```typ
$ sum^10_(🤓=1)
  #rect(width: 4mm, height: 2mm)/🤓
  = 🧠 maltese $
```

如果你希望通过Unicode直接输入数学符号，这也是可能的！

数学调用可以使用`;`作为分隔符具有二维参数列表。最常见的用途是[`mat函数]($math.mat)，它创建矩阵：

```typ
$ mat(
  1, 2, ..., 10;
  2, 2, ..., 10;
  dots.v, dots.v, dots.down, dots.v;
  10, 10, ..., 10;
) $
```

## 如何获得"LaTeX外观"？
用LaTeX排版的论文具有明显的外观。这主要是由于其字体Computer Modern、两端对齐、窄行距和宽边距。

下面的示例：
- 设置宽[边距]($page.margin)
- 启用[两端对齐]($par.justify)、[更紧密的行距]($par.leading)和[首行缩进]($par.first-line-indent)
- [设置字体]($text.font)为"New Computer Modern"（Computer Modern的OpenType衍生字体），用于文本和[代码块]($raw)
- 禁用段落[间距]($block.spacing)
- 增加[标题]($heading)周围的[间距]($block.spacing)

```typ
#set page(margin: 1.75in)
#set par(leading: 0.55em, spacing: 0.55em, first-line-indent: 1.8em, justify: true)
#set text(font: "New Computer Modern")
#show raw: set text(font: "New Computer Modern Mono")
#show heading: set block(above: 1.4em, below: 1em)
```

这应该是一个很好的起点！如果你想进一步深入，为什么不创建一个可重用的模板呢？

## 参考文献
Typst包含一个功能齐全的参考文献系统，与BibTeX文件兼容。你可以通过[`bibliography`]函数继续使用你的`.bib`文献库。另一种可能性是使用[Typst基于YAML的原生格式](https://github.com/typst/hayagriva/blob/main/docs/file-format.md)。

Typst使用Citation Style Language来定义和处理引用和参考文献样式。你可以将CSL文件与BibLaTeX的`.bbx`文件进行比较。编译器已经包含[80多种引用样式]($bibliography.style)，但你可以使用来自[CSL仓库](https://github.com/citation-style-language/styles)的任何符合CSL的样式或编写自己的样式。

你可以使用相同的语法引用参考文献中的条目或引用文档中的标签：`[@key]`（这将引用一个名为`key`的条目）。或者，你可以使用[`cite`]函数。

引用的替代形式，如仅年份和用于散文中的自然引用（cf. `\citet`和`\textcite`），可通过[`[#cite(<key>, form: "prose")]`]($cite.form)获得。

你可以在[`bibliography`]函数的文档页面上找到更多信息。

## 与LaTeX相比，Typst目前有哪些限制？
尽管Typst今天可以替代许多LaTeX功能，但仍有一些功能Typst尚未（或尚未）支持。以下是其中一些列表，其中适用时包含可能的解决方法。

- **成熟的绘图生态系统。** LaTeX用户通常在PGF/TikZ中创建复杂的图表以及文档。Typst生态系统尚未提供同样广泛的选择，但围绕[`cetz包`](https://typst.app/universe/package/cetz)的生态系统正在迅速赶上。

- **不进行分页即可更改页边距。** 在LaTeX中，边距总是可以调整，即使不分页。要在Typst中更改边距，你使用[`page函数]($page)，这将强制分页。如果你只想让几个段落延伸到边距中，然后恢复旧边距，可以使用[`pad函数]($pad)并设置负填充。