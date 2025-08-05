---
title: 制作模板
description: 学习如何将 Typst 文档转换为可复用的模板
prev:
    link: /tutorial/4-advanced-styling/
    label: 高级样式
next: false
---

在本教程的前三个章节中，你已经学会了如何在 Typst 中编写文档、应用基本样式，并深入自定义其外观以符合出版商的格式指南。由于你在上一章中撰写的论文取得了巨大成功，你现在被邀请为同一会议撰写一篇后续文章。这一次，你想把你上一章创建的样式转换为一个可重复使用的模板。在本章中，你将学习如何创建一个你和你的团队只需一条 `show` 规则即可使用的模板。让我们开始吧！

## 一个简单的模板 { #toy-template }
在 Typst 中，模板是你可以用来包裹整个文档的函数。为了学习如何实现这一点，我们先回顾一下如何编写自己的函数。它们可以做任何你想做的事，那为什么不疯狂一点呢？

```typ
#let amazed(term) = box[✨ #term ✨]

You are #amazed[beautiful]!
```

这个函数接受一个参数 `term`，并返回一个内容块，其中 `term` 被星星符号包围。我们还将整个内容放入一个框中，以确保被我们惊叹的词语不会因换行而与星星符号分离。

Typst 自带的许多函数都支持可选的命名参数。我们的函数也可以拥有这些参数。让我们为函数添加一个参数，用于选择文本颜色。我们需要提供一个默认颜色，以防该参数未被指定。

```typ
#let amazed(term, color: blue) = {
  text(color, box[✨ #term ✨])
}

You are #amazed[beautiful]!
I am #amazed(color: purple)[amazed]!
```

现在，模板的工作方式是将整个文档包裹在一个像 `amazed` 这样的自定义函数中。但将整个文档包裹在一个巨大的函数调用中会很繁琐！相反，我们可以使用一个“全部内容”的 `show` 规则，用更简洁的代码实现相同效果。要编写这样的 `show` 规则，在 `show` 关键字后直接加一个冒号，然后提供一个函数。这个函数会将文档的其余部分作为参数接收，并可以对这些内容进行任意处理。由于 `amazed` 函数可以接受单个内容参数，我们可以直接将其名称传给 `show` 规则。让我们试试看：

```typ
#show: amazed
I choose to focus on the good
in my life and let go of any
negative thoughts or beliefs.
In fact, I am amazing!
```

现在，整个文档将被传递给 `amazed` 函数，就像我们用它包裹了文档一样。当然，对于这个特定函数来说，这并不是特别有用，但当与 `set` 规则和命名参数结合使用时，它会变得非常强大。

## 嵌入 set 和 show 规则 { #set-and-show-rules }
为了将一些 `set` 和 `show` 规则应用到我们的模板中，我们可以在函数的内容块中使用 `set` 和 `show`，然后将文档插入该内容块中。

```typ
#let template(doc) = [
  #set text(font: "Inria Serif")
  #show "something cool": [Typst]
  #doc
]

#show: template
I am learning something cool today.
It's going great so far!
```

正如我们在上一章中已经发现的那样，`set` 规则会应用于其内容块内的所有内容。由于“全部内容”的 `show` 规则将整个文档传递给 `template` 函数，因此模板中的文本 `set` 规则和字符串 `show` 规则将应用于整个文档。让我们利用这些知识创建一个模板，重现上一章中论文的正文样式。

```typ
#let conf(title, doc) = {
  set page(
    paper: "us-letter",
    header: align(
      right + horizon,
      title
    ),
    columns: 2,
    ...
  )
  set par(justify: true)
  set text(
    font: "Libertinus Serif",
    size: 11pt,
  )

  // Heading show rules.
  ...

  doc
}

#show: doc => conf(
  [Paper title],
  doc,
)

= Introduction
#lorem(90)

...
```

我们从上一章复制粘贴了大部分代码。有两个主要区别：

1. 我们使用“全部内容”的 `show` 规则将所有内容包裹在 `conf` 函数中。该函数应用了一些 `set` 和 `show` 规则，并在最后回显传入的内容。

2. 此外，我们使用了花括号代码块而不是内容块。这样，我们就不需要在所有 `set` 规则和函数调用前加上 `#`。作为交换，我们不能再在代码块中直接编写标记了。

还要注意标题的来源：我们之前将其放在一个变量中。现在，我们将其作为模板函数的第一个参数接收。为此，我们向“全部内容”的 `show` 规则传递了一个闭包（即一个没有名字且立即使用的函数）。我们这样做是因为 `conf` 函数期望两个位置参数：标题和正文，但 `show` 规则只会传递正文。因此，我们添加了一个新函数定义，允许我们设置论文标题并使用 `show` 规则传入的单个参数。

## 使用命名参数的模板 { #named-arguments }
我们在上一章中的论文包含标题和作者列表。让我们将这些内容添加到我们的模板中。除了标题外，我们还希望模板接受带有从属机构的作者列表以及论文摘要。为了保持可读性，我们将这些作为命名参数添加。最终，我们希望它能像这样工作：

```typ
#show: doc => conf(
  title: [Towards Improved Modelling],
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
  doc,
)

...
```

让我们构建这个新的模板函数。首先，我们为 `title` 参数添加默认值。这样，我们可以在不指定标题的情况下调用模板。我们还为命名的 `authors` 和 `abstract` 参数添加了空的默认值。接下来，我们将上一章中生成标题、摘要和作者的代码复制到模板中，并用参数替换固定的细节。

新的 `authors` 参数期望一个包含键 `name`、`affiliation` 和 `email` 的[数组]中的[字典]($dictionary)。由于作者数量是任意的，我们动态地确定作者列表需要一列、两列还是三列。首先，我们使用 `authors` 数组的 [`.len()`]($array.len) 方法确定作者数量。然后，我们将列数设置为该数量与三者中的最小值，这样我们永远不会创建超过三列。如果有超过三位作者，将插入新行。为此，我们还向 `grid` 函数添加了 `row-gutter` 参数，否则行与行之间会太近。为了从字典中提取作者的详细信息，我们使用了[字段访问语法]($scripting/#fields)。

我们仍需为每个作者向 `grid` 提供一个参数：这时数组的 [`map` 方法]($array.map) 就派上用场了。它接受一个函数作为参数，该函数会被数组中的每个项目调用。我们传入一个函数，该函数为每位作者格式化详细信息并返回一个包含内容值的新数组。现在我们得到了一个值数组，我们希望将其用作 `grid` 的多个参数。我们可以使用 [`spread` 操作符]($arguments) 来实现这一点。它接收一个数组，并将其每个项目作为单独的参数应用于函数。

最终的模板函数如下所示：

```typ
#let conf(
  title: none,
  authors: (),
  abstract: [],
  doc,
) = {
  // Set and show rules from before.
  ...

  set align(center)
  text(17pt, title)

  let count = authors.len()
  let ncols = calc.min(count, 3)
  grid(
    columns: (1fr,) * ncols,
    row-gutter: 24pt,
    ..authors.map(author => [
      #author.name \
      #author.affiliation \
      #link("mailto:" + author.email)
    ]),
  )

  par(justify: false)[
    *Abstract* \
    #abstract
  ]

  set align(left)
  doc
}
```

## 单独的文件 { #separate-file }
大多数情况下，模板是在一个单独的文件中定义，然后导入到文档中的。这样，你编写的主要文件保持整洁，模板也易于重用。通过点击文件面板中的加号按钮创建一个新文本文件，并将其命名为 `conf.typ`。将 `conf` 函数定义移动到这个新文件中。现在，你可以在主文件中通过在 `show` 规则前添加导入语句来访问它。在 `{import}` 关键字和冒号之间指定文件路径，然后命名你想要导入的函数。

为了使模板的应用更加优雅，你可以使用函数的 [`.with`]($function.with) 方法来预先填充所有命名参数。这样，你可以避免拼写出闭包，并在模板列表底部追加内容参数。[Typst Universe]($universe) 上的模板就是为此类函数调用风格设计的。

```typ:single
#import "conf.typ": conf
#show: conf.with(
  title: [
    Towards Improved Modelling
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

= Introduction
#lorem(90)

== Motivation
#lorem(140)

== Problem Statement
#lorem(50)

= Related Work
#lorem(200)
```

我们现在已将会议论文转换为该会议的可重用模板！为什么不分享到 [论坛](https://forum.typst.app/) 或 [Typst 的 Discord 服务器](https://discord.gg/2uDybryKPe)，让其他人也能使用呢？

## 回顾
恭喜你，你已经完成了 Typst 的教程！在本章节中，你学会了如何定义自己的函数，以及如何创建和应用定义可重用文档样式的模板。你已经走了很远，并学到了很多知识。现在你可以使用 Typst 编写自己的文档并与他人分享。

我们仍然是一个非常年轻的项目，正在寻求反馈。如果你有任何问题、建议或发现了错误，请通过 [论坛](https://forum.typst.app/)、[Discord 服务器](https://discord.gg/2uDybryKPe)、[GitHub](https://github.com/typst/typst/) 或网页应用中的反馈表单（始终在帮助菜单中可用）告诉我们。

还等什么？[注册](https://typst.app) 并开始写作吧！