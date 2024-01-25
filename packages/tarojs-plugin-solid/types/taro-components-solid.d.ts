/**
 * solid tsx @tarojs/components 类型提示文件
 *
 * ## 如何使用?
 * 请在全局的类型文件中写入以下代码，覆盖默认的组件类型提示
 * ```typescript
 * declare module '@tarojs/components' {
 *   export * from 'tarojs-plugin-solid/types/taro-components-solid'
 * }
 * ```
 * 本该写在@tarojs/components下的，暂时写在这里吧
 */
import { JSXElement } from 'solid-js'

import { StandardProps, CoverImageProps, CoverViewProps, ListViewProps, MatchMediaProps, MovableAreaProps, MovableViewProps, PageContainerProps, RootPortalProps, ScrollViewProps, ShareElementProps, StickyHeaderProps, StickySectionProps, SwiperProps, SwiperItemProps, ViewProps, IconProps, ProgressProps, RichTextProps, TextProps, ButtonProps, CheckboxProps, CheckboxGroupProps, EditorProps, FormProps, InputProps, KeyboardAccessoryProps, LabelProps, PickerMultiSelectorProps, PickerTimeProps, PickerDateProps, PickerRegionProps, PickerSelectorProps, PickerViewProps, PickerViewColumnProps, RadioProps, RadioGroupProps, SliderProps, SwitchProps, TextareaProps, FunctionalPageNavigatorProps, NavigatorProps, NavigationBarProps, AudioProps, CameraProps, ChannelLiveProps, ChannelVideoProps, ImageProps, LivePlayerProps, LivePusherProps, VideoProps, VoipRoomProps, MapProps, CanvasProps, AdProps, AdCustomProps, OfficialAccountProps, OpenDataProps, WebViewProps, PageMetaProps, CustomWrapperProps, SlotProps, NativeSlotProps } from '@tarojs/components/types/index.d.ts'


/** 转换 react 的类型到 solid */
type Props<T> =
  & Omit<T, 'ref' | 'className' | 'children'>
  & {
    /** class 名 */
    class?: string
    /** 子元素 */
    children?: JSXElement
    classList?: { [key: string]: boolean }
    ref?: JSXElement | ((node: JSXElement) => void)
  };
type Components<T> = (props: Props<T>) => JSXElement;

export * from '@tarojs/components/types/common'
export * from '@tarojs/components/types/event'
export * from '@tarojs/components/types/props'

/** 视图容器 */
export declare const Block: Components<StandardProps>
export declare const CoverImage: Components<CoverImageProps>
export declare const CoverView: Components<CoverViewProps>
export declare const GridView: Components<GridViewProps>
export declare const ListView: Components<ListViewProps>
export declare const MatchMedia: Components<MatchMediaProps>
export declare const MovableArea: Components<MovableAreaProps>
export declare const MovableView: Components<MovableViewProps>
export declare const PageContainer: Components<PageContainerProps>
export declare const RootPortal: Components<RootPortalProps>
export declare const ScrollView: Components<ScrollViewProps>
export declare const ShareElement: Components<ShareElementProps>
export declare const StickyHeader: Components<StickyHeaderProps>
export declare const StickySection: Components<StickySectionProps>
export declare const Swiper: Components<SwiperProps>
export declare const SwiperItem: Components<SwiperItemProps>
export declare const View: Components<ViewProps>
/** 基础内容 */
export declare const Icon: Components<IconProps>
export declare const Progress: Components<ProgressProps>
export declare const RichText: Components<RichTextProps>
export declare const Text: Components<TextProps>
/** 表单组件 */
export declare const Button: Components<ButtonProps>
export declare const Checkbox: Components<CheckboxProps>
export declare const CheckboxGroup: Components<CheckboxGroupProps>
export declare const Editor: Components<EditorProps>
export declare const Form: Components<FormProps>
export declare const Input: Components<InputProps>
export declare const KeyboardAccessory: Components<KeyboardAccessoryProps>
export declare const Label: Components<LabelProps>
export declare const Picker: Components<PickerMultiSelectorProps | PickerTimeProps | PickerDateProps | PickerRegionProps | PickerSelectorProps>
export declare const PickerView: Components<PickerViewProps>
export declare const PickerViewColumn: Components<PickerViewColumnProps>
export declare const Radio: Components<RadioProps>
export declare const RadioGroup: Components<RadioGroupProps>
export declare const Slider: Components<SliderProps>
export declare const Switch: Components<SwitchProps>
export declare const Textarea: Components<TextareaProps>
/** 导航 */
export declare const FunctionalPageNavigator: Components<FunctionalPageNavigatorProps>
export declare const Navigator: Components<NavigatorProps>
export declare const NavigationBar: Components<NavigationBarProps>
/** 媒体组件 */
export declare const Audio: Components<AudioProps>
export declare const Camera: Components<CameraProps>
export declare const ChannelLive: Components<ChannelLiveProps>
export declare const ChannelVideo: Components<ChannelVideoProps>
export declare const Image: Components<ImageProps>
export declare const LivePlayer: Components<LivePlayerProps>
export declare const LivePusher: Components<LivePusherProps>
export declare const Video: Components<VideoProps>
export declare const VoipRoom: Components<VoipRoomProps>
/** 地图 */
export declare const Map: Components<MapProps>
/** 画布 */
export declare const Canvas: Components<CanvasProps>
/** 开放能力 */
export declare const Ad: Components<AdProps>
export declare const AdCustom: Components<AdCustomProps>
export declare const OfficialAccount: Components<OfficialAccountProps>
export declare const OpenData: Components<OpenDataProps>
export declare const WebView: Components<WebViewProps>
/** 配置节点 */
export declare const PageMeta: Components<PageMetaProps>

export declare const CustomWrapper: Components<CustomWrapperProps>
export declare const Slot: Components<SlotProps>
export declare const NativeSlot: Components<NativeSlotProps>
