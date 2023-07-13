---
title: Quickstart for Android
description: This article demonstrates how to create an android device along with some basic functionalities of the device's interface.
sidebar_position: 4
---

## Introduction 

Corellium's generic Android (AOSP) device is based on Ranchu, a virtual Android system-on-chip. It is compiled from the [android-goldfish-3.18](https://android.googlesource.com/kernel/goldfish) branch with the [corellium_defconfig](https://prismic-io.s3.amazonaws.com/corellium-ambassador/26955135-f606-49c0-88a0-9ece9b584e8b_corellium_defconfig) configuration.

Corellium currently supports Android versions 7 to 13.

The Corellium Android device is rooted, and SELinux enforcement is permissive. You can check the console or `logcat` for `auditd` diagnostics to see if SELinux will affect your testing.

## Supported Hardware Devices, Peripherals, & Extensions

The following virtual hardware devices are currently supported for Corellium's virtual Android devices:

- ARM PL011 serial
- ARM Generic Interrupt Controller v2
- [Bluetooth Low Energy](/guides/android/bluetooth.md) (Android 12 and up)
- Goldfish audio
- Goldfish battery
- Goldfish events (supporting the Android back, home, and overview buttons, touch screen, and keyboard)
- Goldfish GSM modem
- Goldfish real-time clock
- graphics card
- VIRTIO hard disk drive
- VIRTIO network interface card

The following Android peripherals are ** not ** currently supported:

- TrustZone features, including Keymaster, PlayReady, and WideVine

Corellium's virtual Android devices support OpenGLES 3.0. The following EGL extensions are ** not ** supported:

- EGL_ANDROID_blob_cache
- EGL_ANDROID_framebuffer_target
- EGL_ANDROID_image_crop
- EGL_ANDROID_image_native_buffer
- EGL_ANDROID_native_fence_sync
- EGL_ANDROID_recordable
- EGL_EXT_buffer_age
- EGL_EXT_create_context_robustness
- EGL_EXT_pixel_format_float
- EGL_KHR_no_config_context
- EGL_KHR_partial_update
- EGL_KHR_surfaceless_context

The following OpenGLES 2 extensions are supported:

- GL_OES_compressed_ETC1_RGB8_texture
- GL_OES_depth24
- GL_OES_depth32
- GL_OES_depth_texture
- GL_OES_depth_texture_cube_map
- GL_OES_EGL_image
- GL_OES_EGL_image_external
- GL_OES_EGL_sync
- GL_OES_element_index_uint
- GL_OES_framebuffer_object
- GL_OES_packed_depth_stencil
- GL_OES_rgb8_rgba8
- GL_OES_standard_derivatives
- GL_OES_texture_float
- GL_OES_texture_float_linear
- GL_OES_texture_half_float
- GL_OES_texture_half_float_linear
- GL_OES_texture_npot
- GL_OES_texture_3D
- GL_EXT_blend_minmax
- GL_EXT_color_buffer_half_float
- GL_EXT_draw_buffers
- GL_EXT_instanced_arrays
- GL_EXT_occlusion_query_boolean
- GL_EXT_read_format_bgra
- GL_EXT_texture_filter_anisotropic
- GL_EXT_texture_format_BGRA8888
- GL_EXT_texture_rg
- GL_ANGLE_framebuffer_blit
- GL_ANGLE_framebuffer_multisample
- GL_CHROMIUM_texture_filtering_hint
- GL_NV_fence
- GL_NV_framebuffer_blit
- GL_NV_read_depth

The following OpenGLES 3 extensions are supported:

- GL_APPLE_texture_max_level
- GL_EXT_clip_cull_distance
- GL_EXT_color_buffer_float
- GL_EXT_discard_framebuffer
- GL_EXT_frag_depth
- GL_EXT_gpu_shader5
- GL_EXT_read_format_bgra
- GL_EXT_render_snorm
- GL_EXT_robustness
- GL_EXT_shader_implicit_conversions
- GL_EXT_shader_integer_mix
- GL_EXT_shader_io_blocks
- GL_EXT_sRGB_write_control
- GL_EXT_texture_compression_bptc
- GL_EXT_texture_compression_dxt1
- GL_EXT_texture_compression_rgtc
- GL_EXT_texture_compression_s3tc
- GL_EXT_texture_compression_s3tc_srgb
- GL_EXT_texture_cube_map_array
- GL_EXT_texture_filter_anisotropic
- GL_EXT_texture_format_BGRA8888
- GL_EXT_texture_norm16
- GL_EXT_texture_rg
- GL_EXT_texture_sRGB_decode
- GL_EXT_texture_sRGB_R8
- GL_EXT_texture_type_2_10_10_10_REV
- GL_EXT_unpack_subimage
- GL_KHR_context_flush_control
- GL_KHR_no_error
- GL_KHR_texture_compression_astc_ldr
- GL_KHR_texture_compression_astc_sliced_3d
- GL_MESA_shader_integer_functions
- GL_NV_fbo_color_attachments
- GL_NV_image_formats
- GL_NV_read_depth
- GL_NV_read_depth_stencil
- GL_NV_read_stencil
- GL_OES_compressed_ETC1_RGB8_texture
- GL_OES_depth24
- GL_OES_depth_texture
- GL_OES_depth_texture_cube_map
- GL_OES_EGL_image
- GL_OES_EGL_image_external
- GL_OES_EGL_image_external_essl3
- GL_OES_EGL_sync
- GL_OES_element_index_uint
- GL_OES_fbo_render_mipmap
- GL_OES_gpu_shader5
- GL_OES_mapbuffer
- GL_OES_packed_depth_stencil
- GL_OES_required_internalformat
- GL_OES_rgb8_rgba8
- GL_OES_sample_variables\
- GL_OES_shader_image_atomic
- GL_OES_shader_io_blocks
- GL_OES_shader_multisample_interpolation
- GL_OES_standard_derivatives
- GL_OES_stencil8
- GL_OES_texture_3D
- GL_OES_texture_cube_map_array
- GL_OES_texture_float
- GL_OES_texture_float_linear
- GL_OES_texture_half_float
- GL_OES_texture_half_float_linear
- GL_OES_texture_npot
- GL_OES_texture_stencil8
- GL_OES_vertex_array_object
- GL_OES_vertex_half_float
