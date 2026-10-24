# 100个服务器专题：正文差异化

范围：`idc-tw-01..30`、`idc-hk-01..30`、`idc-us-01..30`、`idc-compare-01..10`。
基线：`f0f1fa94a1c0b6e24f72faa845b138127f80de42`；本次只改该范围正文，不覆盖后来新增的其他站点。

## 批量使用

Python 3 标准库即可，无第三方依赖。先修改两份人工编辑的内容清单，再运行：

```sh
python3 tools/idc-editorial/rewrite.py
python3 tools/idc-editorial/rewrite.py --check
```

`content.tsv` 每页三段完整编辑材料，`faq.tsv` 每页两个独立问答材料；分隔符为 `|`。脚本只替换固定模板内8个正文段落的文本，保留原标签及属性。若页面结构发生变化，会断言失败，不能绕过检查盲目批量写入。

`audit.json` 保存首次应用时的前后散列、重复文本及对应页面。重复运行会更新该文件的基线；平时用 `--check` 验证，避免覆盖首次审计记录。

## 审计口径与结果

统计8处核心段落：Hero、主题说明、业务示例、验收、询价说明、3条FAQ。共800个位置。改前373种文本，138种出现在多个页面；改后800种文本，无跨页完全相同的核心段落。香港、台湾、美国独立服务器页之间的核心段落精确重合由每对6处降为0处。

这不是用户原先18个全部p元素的统计口径，不包含导航链接、页脚、广告和计算器帮助。保留的简短技术清单与地区提示仍可能合理重复；词句相似和主题重合也不等于完全相同。没有把精确重复消失作为内容质量、收录或排名保证。

100页逐项检查：head字节相同（Title、Description、Canonical、结构化数据等均保留）、全部HTML标签与属性相同、所有href次序相同、脚本和表单字节相同、页脚及广告字节相同。校验还要求元信息独立、Canonical为当前子目录、Umami存在、无替换字符和脚本幂等。CSS、JS、导航与地图文件没有改动。

## 编辑选择

台湾：设施城市、台湾本地网络与跨境网络分测、中华电信接入与地址登记区别、裸金属恢复与现场服务边界。
香港：国际出口与大陆优化出口拆分、CMI/CN2的覆盖方向与证据、清洗路径和应用防护、独享出口与端口速率区别。
美国：城市与上游分开核对、北美客户与亚洲维护的任务差异、跨洋依赖、端口与流量及合理使用限制、现场支持时区。
地区比较：统一任务、资源、报价和币种口径；保留未测条件，不提供无证据的地区排名。

每页材料按该关键词分别撰写，脚本不靠替换地区名生成文章。计算器原有演示数字保留，正文明确它们不是实际报价。未新增实测性能、线路等级、机房认证、价格、库存、IDC3产品规格或防御峰值承诺。未核实的条件写为应索取的证据或询价项。

## 技术核对资料（2026-10-24）

以下是概念核对资料，不是IDC3或任何当前租机套餐的资质证明，也不意味着这些设施就是所售主机所在机房。

- [APNIC：地址登记服务](https://www.apnic.net/manage-ip/apnic-services/registration-services/)：登记和查询的对象。
- [APNIC：IP地理定位准确性](https://blog.apnic.net/2020/09/15/how-accurate-are-ip-geolocation-services/)：地理库有误差，不以单一库作全面保证。
- [ARIN：RDAP](https://www.arin.net/resources/rdap.html)：资源登记查询。
- [Microsoft：远程桌面授权选择](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/rds-plan-choose-how-you-pay)：不同用途和服务模式需确认授权，不将管理登录等同于多人办公许可。
- [Cloudflare：DDoS防护分层](https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/ddos/)：网络层与HTTP应用层防护需区分。
- [Equinix：洛杉矶设施](https://www.equinix.com/data-centers/americas-colocation/united-states-colocation/los-angeles-data-centers)及[硅谷设施](https://www.equinix.com/data-centers/americas-colocation/united-states-colocation/silicon-valley-data-centers)：城市与设施和互联产品分别确认，未引用其性能作为租机承诺。
- [Chief：台湾IDC](https://en.chief.com.tw/idc/aboutchiefidc/)：台湾设施与网络接入需要具体核对，未将其宣传数值带入专题。

带宽换算仅用十进制算术：Mbps ÷ 8 = MB/s；持续Mbps × 1,000,000 ÷ 8 × 86400 × 30为30天理论字节数。实际流量和账单以合同计量规则为准。

## 回滚

在确认没有后续依赖后，对本次提交使用 `git revert <commit>`，即可一起回滚100页及本工具。不要使用强推或重置主分支覆盖后来提交。
